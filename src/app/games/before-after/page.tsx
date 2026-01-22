'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: string;
  dayNumber: number;
  factA: string;
  factB: string;
  category?: string;
}

interface GameResult {
  won: boolean;
  yearA: number;
  yearB: number;
  explanation: string;
  source?: string;
}

export default function BeforeAfterGame() {
  const { status } = useSession();
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/games/before-after');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchQuestion();
    }
  }, [status]);

  const fetchQuestion = async () => {
    try {
      const res = await fetch('/api/games/before-after');
      const data = await res.json();

      if (res.ok) {
        setQuestion(data.question);
        setHasPlayed(data.hasPlayed);
        if (data.result) {
          setResult(data.result);
        }
      } else {
        setError(data.error || 'Failed to load question');
      }
    } catch {
      setError('Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (answer: 'A' | 'B') => {
    if (submitting || hasPlayed) return;

    setSubmitting(true);
    setSelectedAnswer(answer);

    try {
      const res = await fetch('/api/games/before-after', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });

      const data = await res.json();

      if (res.ok) {
        setHasPlayed(true);
        setResult({
          won: data.correct,
          yearA: data.yearA,
          yearB: data.yearB,
          explanation: data.explanation,
          source: data.source,
        });
      } else {
        setError(data.error || 'Failed to submit answer');
      }
    } catch {
      setError('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link
            href="/dashboard"
            className="text-purple-600 hover:underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-gray-600 text-xl mb-4">No question available for today</div>
          <Link
            href="/dashboard"
            className="text-purple-600 hover:underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatYear = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} BC`;
    }
    return year.toString();
  };

  // Determine which came first for display purposes
  const aIsFirst = result ? result.yearA < result.yearB : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-700 font-medium mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Day {question.dayNumber}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Before & After</h1>
          <p className="text-gray-600">Which event happened first?</p>
          {question.category && (
            <span className="inline-block mt-2 text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
              {question.category}
            </span>
          )}
        </div>

        {/* Game Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Option A */}
          <button
            onClick={() => !hasPlayed && submitAnswer('A')}
            disabled={hasPlayed || submitting}
            className={`relative bg-white rounded-2xl shadow-lg p-8 text-left transition-all duration-300 ${
              hasPlayed && result
                ? aIsFirst
                  ? 'ring-4 ring-green-400'
                  : 'ring-4 ring-red-400'
                : 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
            } ${submitting && selectedAnswer === 'A' ? 'animate-pulse' : ''}`}
          >
            <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              A
            </div>
            <div className="pr-12">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {question.factA}
              </p>
              {hasPlayed && result && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-3xl font-bold text-gray-800">
                    {formatYear(result.yearA)}
                  </p>
                  {aIsFirst && (
                    <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      First
                    </span>
                  )}
                </div>
              )}
            </div>
            {hasPlayed && result && (
              <div className={`absolute bottom-4 right-4 ${
                aIsFirst ? 'text-green-500' : 'text-red-500'
              }`}>
                {aIsFirst ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-purple-500 to-violet-400 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
              OR
            </div>
          </div>
          <div className="md:hidden flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-violet-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
              OR
            </div>
          </div>

          {/* Option B */}
          <button
            onClick={() => !hasPlayed && submitAnswer('B')}
            disabled={hasPlayed || submitting}
            className={`relative bg-white rounded-2xl shadow-lg p-8 text-left transition-all duration-300 ${
              hasPlayed && result
                ? !aIsFirst
                  ? 'ring-4 ring-green-400'
                  : 'ring-4 ring-red-400'
                : 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
            } ${submitting && selectedAnswer === 'B' ? 'animate-pulse' : ''}`}
          >
            <div className="absolute top-4 right-4 bg-violet-100 text-violet-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              B
            </div>
            <div className="pr-12">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {question.factB}
              </p>
              {hasPlayed && result && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-3xl font-bold text-gray-800">
                    {formatYear(result.yearB)}
                  </p>
                  {!aIsFirst && (
                    <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      First
                    </span>
                  )}
                </div>
              )}
            </div>
            {hasPlayed && result && (
              <div className={`absolute bottom-4 right-4 ${
                !aIsFirst ? 'text-green-500' : 'text-red-500'
              }`}>
                {!aIsFirst ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            )}
          </button>
        </div>

        {/* Result Message */}
        {hasPlayed && result && (
          <div className={`text-center p-6 rounded-2xl mb-8 ${
            result.won
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            <div className="text-2xl font-bold mb-2">
              {result.won ? 'Correct!' : 'Incorrect!'}
            </div>
            <p className="mb-4">
              {result.won
                ? 'Great job! You got it right!'
                : 'Better luck tomorrow!'}
            </p>
          </div>
        )}

        {/* Explanation */}
        {hasPlayed && result && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Wait, really?</h3>
                <p className="text-gray-600 leading-relaxed">{result.explanation}</p>
                {result.source && (
                  <p className="text-sm text-gray-400 mt-3">Source: {result.source}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto text-center bg-white text-gray-700 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Back to Dashboard
          </Link>
          {hasPlayed && (
            <Link
              href="/games/more-or-less"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Play More or Less
            </Link>
          )}
          {hasPlayed && (
            <Link
              href="/games/timeline"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-orange-500 to-red-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Timeline
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
