import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCurrentDayNumber } from '@/lib/gameUtils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const currentDayNumber = getCurrentDayNumber();

    // Get all game results for the user
    const allResults = await prisma.gameResult.findMany({
      where: { userId },
      orderBy: { playedAt: 'desc' },
    });

    // Calculate More or Less stats
    const moreOrLessResults = allResults.filter(
      (r) => r.gameType === 'more-or-less'
    );
    const moreOrLessWins = moreOrLessResults.filter((r) => r.won).length;
    const moreOrLessTotal = moreOrLessResults.length;

    // Calculate Timeline stats
    const timelineResults = allResults.filter((r) => r.gameType === 'timeline');
    const timelineWins = timelineResults.filter((r) => r.won).length;
    const timelineTotal = timelineResults.length;

    // Calculate Before & After stats
    const beforeAfterResults = allResults.filter((r) => r.gameType === 'before-after');
    const beforeAfterWins = beforeAfterResults.filter((r) => r.won).length;
    const beforeAfterTotal = beforeAfterResults.length;

    // Calculate current win streaks
    const moreOrLessStreak = calculateStreak(moreOrLessResults);
    const timelineStreak = calculateStreak(timelineResults);
    const beforeAfterStreak = calculateStreak(beforeAfterResults);

    // Check if played today
    const playedMoreOrLessToday = moreOrLessResults.some(
      (r) => r.dayNumber === currentDayNumber
    );
    const playedTimelineToday = timelineResults.some(
      (r) => r.dayNumber === currentDayNumber
    );
    const playedBeforeAfterToday = beforeAfterResults.some(
      (r) => r.dayNumber === currentDayNumber
    );

    // Get recent activity (last 10 games)
    const recentActivity = allResults.slice(0, 10).map((r) => ({
      gameType: r.gameType,
      won: r.won,
      score: r.score,
      playedAt: r.playedAt,
      dayNumber: r.dayNumber,
    }));

    const totalWins = moreOrLessWins + timelineWins + beforeAfterWins;

    return NextResponse.json({
      moreOrLess: {
        wins: moreOrLessWins,
        total: moreOrLessTotal,
        winRate:
          moreOrLessTotal > 0
            ? Math.round((moreOrLessWins / moreOrLessTotal) * 100)
            : 0,
        currentStreak: moreOrLessStreak,
        playedToday: playedMoreOrLessToday,
      },
      timeline: {
        wins: timelineWins,
        total: timelineTotal,
        winRate:
          timelineTotal > 0
            ? Math.round((timelineWins / timelineTotal) * 100)
            : 0,
        currentStreak: timelineStreak,
        playedToday: playedTimelineToday,
      },
      beforeAfter: {
        wins: beforeAfterWins,
        total: beforeAfterTotal,
        winRate:
          beforeAfterTotal > 0
            ? Math.round((beforeAfterWins / beforeAfterTotal) * 100)
            : 0,
        currentStreak: beforeAfterStreak,
        playedToday: playedBeforeAfterToday,
      },
      overall: {
        totalGames: allResults.length,
        totalWins,
        winRate:
          allResults.length > 0
            ? Math.round((totalWins / allResults.length) * 100)
            : 0,
      },
      recentActivity,
      currentDayNumber,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

function calculateStreak(
  results: { won: boolean; dayNumber: number }[]
): number {
  if (results.length === 0) return 0;

  // Sort by dayNumber descending
  const sorted = [...results].sort((a, b) => b.dayNumber - a.dayNumber);

  let streak = 0;
  for (const result of sorted) {
    if (result.won) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
