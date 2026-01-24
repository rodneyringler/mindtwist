import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentDayNumber, shuffleArray } from '@/lib/gameUtils';
import { getAuthenticatedUser } from '@/lib/getUser';

// GET - Get today's Timeline events
export async function GET() {
  try {
    const dayNumber = getCurrentDayNumber();

    const events = await prisma.timelineEvent.findMany({
      where: { dayNumber },
      orderBy: { eventOrder: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    if (events.length === 0) {
      return NextResponse.json(
        { error: 'No events available for today' },
        { status: 404 }
      );
    }

    // Check if user has already played today
    const user = await getAuthenticatedUser();
    let hasPlayed = false;
    let result = null;

    if (user?.id) {
      const existingResult = await prisma.gameResult.findUnique({
        where: {
          userId_gameType_dayNumber: {
            userId: user.id,
            gameType: 'timeline',
            dayNumber,
          },
        },
      });

      if (existingResult) {
        hasPlayed = true;
        // Get full event data with years
        const fullEvents = await prisma.timelineEvent.findMany({
          where: { dayNumber },
          orderBy: { eventOrder: 'asc' },
        });

        // Reconstruct submitted order from stored details
        let submittedOrder = fullEvents;
        if (existingResult.details) {
          const details = JSON.parse(existingResult.details);
          if (details.submittedOrder) {
            // Map IDs back to full event objects in submitted order
            const eventMap = new Map(fullEvents.map(e => [e.id, e]));
            submittedOrder = details.submittedOrder
              .map((id: string) => eventMap.get(id))
              .filter(Boolean);
          }
        }

        result = {
          won: existingResult.won,
          score: existingResult.score,
          correctOrder: fullEvents,
          submittedOrder,
        };
      }
    }

    // Shuffle events for new players
    const shuffledEvents = hasPlayed ? events : shuffleArray(events);

    return NextResponse.json({
      events: shuffledEvents,
      dayNumber,
      hasPlayed,
      result,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Submit Timeline answer
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();

    if (!user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { orderedEventIds } = await request.json();

    if (!orderedEventIds || !Array.isArray(orderedEventIds)) {
      return NextResponse.json(
        { error: 'Invalid submission. Expected array of event IDs' },
        { status: 400 }
      );
    }

    const dayNumber = getCurrentDayNumber();

    // Check if already played today
    const existingResult = await prisma.gameResult.findUnique({
      where: {
        userId_gameType_dayNumber: {
          userId: user.id,
          gameType: 'timeline',
          dayNumber,
        },
      },
    });

    if (existingResult) {
      return NextResponse.json(
        { error: 'You have already played today' },
        { status: 400 }
      );
    }

    // Get the correct order
    const correctEvents = await prisma.timelineEvent.findMany({
      where: { dayNumber },
      orderBy: { eventOrder: 'asc' },
    });

    if (correctEvents.length === 0) {
      return NextResponse.json(
        { error: 'No events available for today' },
        { status: 404 }
      );
    }

    const correctOrderIds = correctEvents.map((e) => e.id);

    // Calculate score (number of correctly placed events)
    let correctCount = 0;
    for (let i = 0; i < orderedEventIds.length; i++) {
      if (orderedEventIds[i] === correctOrderIds[i]) {
        correctCount++;
      }
    }

    const won = correctCount === correctOrderIds.length;
    const score = correctCount;

    // Save result
    await prisma.gameResult.create({
      data: {
        userId: user.id,
        gameType: 'timeline',
        dayNumber,
        won,
        score,
        details: JSON.stringify({
          submittedOrder: orderedEventIds,
          correctOrder: correctOrderIds,
        }),
      },
    });

    return NextResponse.json({
      won,
      score,
      totalEvents: correctOrderIds.length,
      correctOrder: correctEvents,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
