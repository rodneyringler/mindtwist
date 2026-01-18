'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  year?: number;
  month?: number;
  day?: number;
}

interface GameResult {
  won: boolean;
  score: number;
  correctOrder: TimelineEvent[];
}

function SortableItem({
  event,
  isCorrect,
  showResult,
}: {
  event: TimelineEvent;
  isCorrect?: boolean;
  showResult: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-xl shadow-md p-4 mb-3 cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'shadow-xl scale-[1.02] z-50' : ''
      } ${
        showResult
          ? isCorrect
            ? 'ring-2 ring-green-400 bg-green-50'
            : 'ring-2 ring-red-400 bg-red-50'
          : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{event.title}</h3>
          {event.description && (
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          )}
          {showResult && event.year && (
            <p className="text-sm font-medium text-gray-500 mt-2">
              {event.year}
              {event.month && `-${String(event.month).padStart(2, '0')}`}
              {event.day && `-${String(event.day).padStart(2, '0')}`}
            </p>
          )}
        </div>
        {showResult && (
          <div
            className={`flex-shrink-0 ${
              isCorrect ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isCorrect ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelineGame() {
  const { status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [dayNumber, setDayNumber] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/games/timeline');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEvents();
    }
  }, [status]);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/games/timeline');
      const data = await res.json();

      if (res.ok) {
        setEvents(data.events);
        setDayNumber(data.dayNumber);
        setHasPlayed(data.hasPlayed);
        if (data.result) {
          setResult(data.result);
          // Update events with correct order data for display
          setEvents(data.result.correctOrder);
        }
      } else {
        setError(data.error || 'Failed to load events');
      }
    } catch {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const submitAnswer = async () => {
    if (submitting || hasPlayed) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/games/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedEventIds: events.map((e) => e.id) }),
      });

      const data = await res.json();

      if (res.ok) {
        setHasPlayed(true);
        setResult({
          won: data.won,
          score: data.score,
          correctOrder: data.correctOrder,
        });
        // Update events with correct order for display
        setEvents(data.correctOrder);
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link href="/dashboard" className="text-orange-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-gray-600 text-xl mb-4">
            No events available for today
          </div>
          <Link href="/dashboard" className="text-orange-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Determine which events are in correct position for result display
  const getIsCorrect = (eventId: string, index: number) => {
    if (!result) return false;
    return result.correctOrder[index]?.id === eventId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium mb-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Day {dayNumber}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Timeline</h1>
          <p className="text-gray-600">
            {hasPlayed
              ? 'Here are the correct chronological positions'
              : 'Drag events into chronological order (earliest first)'}
          </p>
        </div>

        {/* Timeline indicator */}
        <div className="flex justify-between text-sm text-gray-500 mb-4 px-4">
          <span>Earliest</span>
          <span>Latest</span>
        </div>

        {/* Events List */}
        <div className="mb-8">
          {hasPlayed ? (
            // Show results without dragging
            <div>
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-md p-4 mb-3 ${
                    result
                      ? getIsCorrect(event.id, index)
                        ? 'ring-2 ring-green-400 bg-green-50'
                        : 'ring-2 ring-red-400 bg-red-50'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description}
                        </p>
                      )}
                      {event.year && (
                        <p className="text-sm font-medium text-gray-500 mt-2">
                          {event.year}
                          {event.month &&
                            `-${String(event.month).padStart(2, '0')}`}
                          {event.day &&
                            `-${String(event.day).padStart(2, '0')}`}
                        </p>
                      )}
                    </div>
                    {result && (
                      <div
                        className={`flex-shrink-0 ${
                          getIsCorrect(event.id, index)
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {getIsCorrect(event.id, index) ? (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Draggable list
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={events.map((e) => e.id)}
                strategy={verticalListSortingStrategy}
              >
                {events.map((event) => (
                  <SortableItem
                    key={event.id}
                    event={event}
                    showResult={hasPlayed}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Submit Button */}
        {!hasPlayed && (
          <div className="text-center mb-8">
            <button
              onClick={submitAnswer}
              disabled={submitting}
              className={`bg-gradient-to-r from-orange-500 to-red-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-200 ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        )}

        {/* Result Message */}
        {hasPlayed && result && (
          <div
            className={`text-center p-6 rounded-2xl mb-8 ${
              result.won
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            <div className="text-2xl font-bold mb-2">
              {result.won ? 'Perfect!' : `${result.score} / ${events.length} Correct`}
            </div>
            <p>
              {result.won
                ? 'You got all events in the correct order!'
                : 'Keep practicing to improve your timeline skills!'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-white text-gray-700 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Back to Dashboard
          </Link>
          {hasPlayed && (
            <Link
              href="/games/more-or-less"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Play More or Less
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
