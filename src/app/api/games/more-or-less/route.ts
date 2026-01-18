import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCurrentDayNumber } from '@/lib/gameUtils';

// GET - Get today's More or Less question
export async function GET() {
  try {
    const dayNumber = getCurrentDayNumber();

    const question = await prisma.moreOrLessQuestion.findUnique({
      where: { dayNumber },
      select: {
        id: true,
        dayNumber: true,
        statementA: true,
        statementB: true,
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
            gameType: 'more-or-less',
            dayNumber,
          },
        },
      });

      if (existingResult) {
        hasPlayed = true;
        // Include the actual values if already played
        const fullQuestion = await prisma.moreOrLessQuestion.findUnique({
          where: { dayNumber },
        });
        result = {
          won: existingResult.won,
          valueA: fullQuestion?.valueA,
          valueB: fullQuestion?.valueB,
          sourceA: fullQuestion?.sourceA,
          sourceB: fullQuestion?.sourceB,
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

// POST - Submit answer for More or Less
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { answer } = await request.json(); // 'A' or 'B'

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
          gameType: 'more-or-less',
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
    const question = await prisma.moreOrLessQuestion.findUnique({
      where: { dayNumber },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'No question available for today' },
        { status: 404 }
      );
    }

    // Determine if correct
    const correctAnswer = question.valueA > question.valueB ? 'A' : 'B';
    const won = answer === correctAnswer;

    // Save result
    await prisma.gameResult.create({
      data: {
        userId: session.user.id,
        gameType: 'more-or-less',
        dayNumber,
        won,
        details: JSON.stringify({ answer, correctAnswer }),
      },
    });

    return NextResponse.json({
      correct: won,
      correctAnswer,
      valueA: question.valueA,
      valueB: question.valueB,
      sourceA: question.sourceA,
      sourceB: question.sourceB,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
