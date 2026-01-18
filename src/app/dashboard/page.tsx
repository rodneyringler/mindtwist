'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface GameStats {
  wins: number;
  total: number;
  winRate: number;
  currentStreak: number;
  playedToday: boolean;
}

interface OverallStats {
  totalGames: number;
  totalWins: number;
  winRate: number;
}

interface RecentActivity {
  gameType: string;
  won: boolean;
  score: number | null;
  playedAt: string;
  dayNumber: number;
}

interface Stats {
  moreOrLess: GameStats;
  timeline: GameStats;
  overall: OverallStats;
  recentActivity: RecentActivity[];
  currentDayNumber: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full shadow-lg hidden md:block"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                Welcome back, {session.user.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Day {stats?.currentDayNumber || '...'} - Ready for today&apos;s challenges?
              </p>
            </div>
          </div>
        </div>

        {/* Today's Games */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Today&apos;s Games</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* More or Less Card */}
            <Link href="/games/more-or-less" className="block rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-400 p-3 md:p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg md:text-xl font-bold">More or Less</h3>
                    <p className="text-white/80 text-xs md:text-sm">Compare two statistics</p>
                  </div>
                </div>
                {stats?.moreOrLess.playedToday ? (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-xs md:text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-blue-600 text-xs md:text-sm font-medium">
                    Play Now
                  </div>
                )}
              </div>
            </Link>

            {/* Timeline Card */}
            <Link href="/games/timeline" className="block rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-orange-500 to-red-400 p-3 md:p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg md:text-xl font-bold">Timeline</h3>
                    <p className="text-white/80 text-xs md:text-sm">Order historical events</p>
                  </div>
                </div>
                {stats?.timeline.playedToday ? (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-xs md:text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-orange-600 text-xs md:text-sm font-medium">
                    Play Now
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Statistics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Overall Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Overall</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Games</span>
                  <span className="font-bold text-gray-800">{stats?.overall.totalGames || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wins</span>
                  <span className="font-bold text-gray-800">{stats?.overall.totalWins || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-bold text-purple-600">{stats?.overall.winRate || 0}%</span>
                </div>
              </div>
            </div>

            {/* More or Less Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">More or Less</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Played</span>
                  <span className="font-bold text-gray-800">{stats?.moreOrLess.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-bold text-blue-600">{stats?.moreOrLess.winRate || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-gray-800">{stats?.moreOrLess.currentStreak || 0}</span>
                </div>
              </div>
            </div>

            {/* Timeline Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Timeline</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Played</span>
                  <span className="font-bold text-gray-800">{stats?.timeline.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-bold text-orange-600">{stats?.timeline.winRate || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-gray-800">{stats?.timeline.currentStreak || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {stats?.recentActivity && stats.recentActivity.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.gameType === 'more-or-less'
                        ? 'bg-blue-100'
                        : 'bg-orange-100'
                    }`}>
                      {activity.gameType === 'more-or-less' ? (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {activity.gameType === 'more-or-less' ? 'More or Less' : 'Timeline'}
                        <span className="text-gray-500 font-normal ml-2">Day {activity.dayNumber}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.playedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.won
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.won ? 'Won' : 'Lost'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
