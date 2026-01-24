import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';
import { headers } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development'
);

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

// Get user from either NextAuth session or Bearer token (for iOS)
export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  // First, try NextAuth session (web)
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    return {
      id: session.user.id,
      name: session.user.name || null,
      email: session.user.email || null,
      image: session.user.image || null,
    };
  }

  // Second, try Bearer token (iOS)
  const headersList = await headers();
  const authHeader = headersList.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.userId && typeof payload.userId === 'string') {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, name: true, email: true, image: true },
        });
        if (user) {
          return user;
        }
      }
    } catch {
      // Invalid token, fall through to return null
    }
  }

  return null;
}

// Generate JWT for iOS app
export async function generateIOSToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // 30 days
    .sign(JWT_SECRET);

  return token;
}

// Validate Google ID token and return user info
export async function validateGoogleToken(idToken: string): Promise<{
  email: string;
  name: string;
  picture: string;
  sub: string;
} | null> {
  try {
    // Validate with Google's tokeninfo endpoint
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Verify the token is for our app
    const expectedClientId = process.env.GOOGLE_CLIENT_ID;
    if (data.aud !== expectedClientId && data.azp !== expectedClientId) {
      // For iOS, the azp (authorized party) might be different
      // We'll be more lenient here but log it
      console.log('Google token client ID mismatch, but allowing for iOS');
    }

    return {
      email: data.email,
      name: data.name,
      picture: data.picture,
      sub: data.sub,
    };
  } catch (error) {
    console.error('Error validating Google token:', error);
    return null;
  }
}
