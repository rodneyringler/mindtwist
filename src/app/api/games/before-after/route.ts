import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCurrentDayNumber } from '@/lib/gameUtils';

// GET - Get today's Before & After question
export async function GET() {
  try {
    const dayNumber = getCurrentDayNumber();

    const question = await prisma.beforeAfterQuestion.findUnique({
      where: { dayNumber },
      select: {
        id: true,
        dayNumber: true,
        factA: true,
        factB: true,
        category: true,
      },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'No question available for today' },
        { status: 404 }
      );
    }

    // Check if user has already played today
    const session = await getServerSession(authOptions);
    let hasPlayed = false;
    let result = null;

    if (session?.user?.id) {
      const existingResult = await prisma.gameResult.findUnique({
        where: {
          userId_gameType_dayNumber: {
            userId: session.user.id,
            gameType: 'before-after',
            dayNumber,
          },
        },
      });

      if (existingResult) {
        hasPlayed = true;
        // Include the actual years and explanation if already played
        const fullQuestion = await prisma.beforeAfterQuestion.findUnique({
          where: { dayNumber },
        });
        result = {
          won: existingResult.won,
          yearA: fullQuestion?.yearA,
          yearB: fullQuestion?.yearB,
          explanation: fullQuestion?.explanation,
          source: fullQuestion?.source,
        };
      }
    }

    return NextResponse.json({
      question,
      dayNumber,
      hasPlayed,
      result,
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

// POST - Submit answer for Before & After
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { answer } = await request.json(); // 'A' or 'B' - which came first

    if (!answer || !['A', 'B'].includes(answer)) {
      return NextResponse.json(
        { error: 'Invalid answer. Must be "A" or "B"' },
        { status: 400 }
      );
    }

    const dayNumber = getCurrentDayNumber();

    // Check if already played today
    const existingResult = await prisma.gameResult.findUnique({
      where: {
        userId_gameType_dayNumber: {
          userId: session.user.id,
          gameType: 'before-after',
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

    // Get the question
    const question = await prisma.beforeAfterQuestion.findUnique({
      where: { dayNumber },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'No question available for today' },
        { status: 404 }
      );
    }

    // Determine if correct - the correct answer is whichever happened first (lower year)
    const correctAnswer = question.yearA < question.yearB ? 'A' : 'B';
    const won = answer === correctAnswer;

    // Save result
    await prisma.gameResult.create({
      data: {
        userId: session.user.id,
        gameType: 'before-after',
        dayNumber,
        won,
        details: JSON.stringify({ answer, correctAnswer }),
      },
    });

    return NextResponse.json({
      correct: won,
      correctAnswer,
      yearA: question.yearA,
      yearB: question.yearB,
      explanation: question.explanation,
      source: question.source,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
