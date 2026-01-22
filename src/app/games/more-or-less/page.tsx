'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: string;
  dayNumber: number;
  statementA: string;
  statementB: string;
  category?: string;
}

interface GameResult {
  won: boolean;
  valueA: number;
  valueB: number;
  sourceA?: string;
  sourceB?: string;
}

export default function MoreOrLessGame() {
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
      router.push('/auth/signin?callbackUrl=/games/more-or-less');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchQuestion();
    }
  }, [status]);

  const fetchQuestion = async () => {
    try {
      const res = await fetch('/api/games/more-or-less');
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
      const res = await fetch('/api/games/more-or-less', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });

      const data = await res.json();

      if (res.ok) {
        setHasPlayed(true);
        setResult({
          won: data.correct,
          valueA: data.valueA,
          valueB: data.valueB,
          sourceA: data.sourceA,
          sourceB: data.sourceB,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-gray-600 text-xl mb-4">No question available for today</div>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 font-medium mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Day {question.dayNumber}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">More or Less</h1>
          <p className="text-gray-600">Which value is greater?</p>
        </div>

        {/* Game Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Option A */}
          <button
            onClick={() => !hasPlayed && submitAnswer('A')}
            disabled={hasPlayed || submitting}
            className={`relative bg-white rounded-2xl shadow-lg p-8 text-left transition-all duration-300 ${
              hasPlayed && result
                ? result.valueA >= result.valueB
                  ? 'ring-4 ring-green-400'
                  : 'ring-4 ring-red-400'
                : 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
            } ${submitting && selectedAnswer === 'A' ? 'animate-pulse' : ''}`}
          >
            <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              A
            </div>
            <div className="pr-12">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {question.statementA}
              </p>
              {hasPlayed && result && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-3xl font-bold text-gray-800">
                    {formatNumber(result.valueA)}
                  </p>
                  {result.sourceA && (
                    <p className="text-sm text-gray-500 mt-2">{result.sourceA}</p>
                  )}
                </div>
              )}
            </div>
            {hasPlayed && result && (
              <div className={`absolute bottom-4 right-4 ${
                result.valueA >= result.valueB ? 'text-green-500' : 'text-red-500'
              }`}>
                {result.valueA >= result.valueB ? (
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

          {/* VS Divider */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              VS
            </div>
          </div>
          <div className="md:hidden flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">
              VS
            </div>
          </div>

          {/* Option B */}
          <button
            onClick={() => !hasPlayed && submitAnswer('B')}
            disabled={hasPlayed || submitting}
            className={`relative bg-white rounded-2xl shadow-lg p-8 text-left transition-all duration-300 ${
              hasPlayed && result
                ? result.valueB > result.valueA
                  ? 'ring-4 ring-green-400'
                  : 'ring-4 ring-red-400'
                : 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
            } ${submitting && selectedAnswer === 'B' ? 'animate-pulse' : ''}`}
          >
            <div className="absolute top-4 right-4 bg-cyan-100 text-cyan-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              B
            </div>
            <div className="pr-12">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {question.statementB}
              </p>
              {hasPlayed && result && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-3xl font-bold text-gray-800">
                    {formatNumber(result.valueB)}
                  </p>
                  {result.sourceB && (
                    <p className="text-sm text-gray-500 mt-2">{result.sourceB}</p>
                  )}
                </div>
              )}
            </div>
            {hasPlayed && result && (
              <div className={`absolute bottom-4 right-4 ${
                result.valueB > result.valueA ? 'text-green-500' : 'text-red-500'
              }`}>
                {result.valueB > result.valueA ? (
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
            <p>
              {result.won
                ? 'Great job! You got it right!'
                : 'Better luck tomorrow!'}
            </p>
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
              href="/games/timeline"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-orange-500 to-red-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Play Timeline
            </Link>
          )}
          {hasPlayed && (
            <Link
              href="/games/before-after"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-500 to-violet-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Play Before & After
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
