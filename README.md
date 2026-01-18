# MindTwist - Daily Brain Games

MindTwist is a web application that offers daily brain challenges through two engaging games. Challenge yourself with trivia comparisons and historical timelines while tracking your progress over time.

## Games

### More or Less
Two obscure statistics are presented. Simply choose which value is larger. Sounds easy? Try comparing hot dog consumption to railway miles!

### Timeline
Five historical events appear in random order. Drag them into chronological sequence. Events are intentionally unrelated to prevent pattern-gaming.

## Features

- **Daily Challenges**: New puzzles every day for both games
- **Google OAuth Authentication**: Sign in with your Google account
- **Progress Tracking**: View your stats, win rates, and streaks
- **Responsive Design**: Works on desktop and mobile devices
- **API Endpoints**: RESTful API for potential mobile app integration

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MariaDB with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Drag & Drop**: @dnd-kit library for Timeline game

## Prerequisites

- Node.js 18+
- MariaDB (or MySQL)
- Google OAuth credentials

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rodneyringler/mindtwist.git
cd mindtwist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/mindtwist"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth Client ID
5. Configure the consent screen
6. Create OAuth 2.0 Client ID (Web application)
7. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
8. Copy the Client ID and Client Secret to your `.env` file

### 5. Set up the database

Create the database:
```bash
mysql -u root -p -e "CREATE DATABASE mindtwist;"
```

Run migrations:
```bash
npx prisma migrate dev
```

Seed the database with 100 days of game data:
```bash
npm run db:seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed database with game data |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:push` | Push schema changes (dev only) |
| `npm run db:studio` | Open Prisma Studio |

## API Endpoints

### Authentication
- `GET/POST /api/auth/*` - NextAuth.js authentication endpoints

### Games
- `GET /api/games/more-or-less` - Get today's More or Less question
- `POST /api/games/more-or-less` - Submit answer for More or Less
- `GET /api/games/timeline` - Get today's Timeline events
- `POST /api/games/timeline` - Submit answer for Timeline

### Stats
- `GET /api/stats` - Get user's game statistics

## Project Structure

```
mindtwist/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed data (100 days)
│   └── migrations/        # Database migrations
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── auth/          # Auth pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── games/         # Game pages
│   │   └── instructions/  # Instructions page
│   ├── components/        # React components
│   ├── lib/               # Utilities and configs
│   └── types/             # TypeScript types
└── public/                # Static assets
```

## Assumptions Made

1. **Day Calculation**: Day 1 starts on January 1, 2026. Days cycle through 1-100 to allow continuous play.

2. **Game Rules**:
   - Each game can only be played once per calendar day per user
   - Timeline game requires exactly 5 events in the correct order to win
   - More or Less requires selecting the larger value

3. **Data Sources**: The seed data includes researched statistics and historical events. Sources are provided where applicable, though users should verify for accuracy.

4. **Authentication**: Only Google OAuth is supported. Users must have a Google account to play and track progress.

5. **Database**: MariaDB is used (MySQL compatible). The application uses Prisma ORM for database access.

## Production Deployment

1. Set secure environment variables
2. Use a production database (consider PlanetScale, AWS RDS, etc.)
3. Deploy to Vercel, Railway, or similar platform
4. Update `NEXTAUTH_URL` to your production domain
5. Update Google OAuth redirect URIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning or building your own version.

---

Built with Next.js and love for trivia.
