// Game utility functions

// The start date for day calculations - this is when day 1 begins
const START_DATE = new Date('2026-01-01T00:00:00Z');

/**
 * Get the current day number based on the start date
 * Day 1 starts on START_DATE, and increments by 1 each day
 * Cycles through 1-100 to allow infinite play
 */
export function getCurrentDayNumber(): number {
  const now = new Date();
  const diffTime = now.getTime() - START_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // Cycle through days 1-100
  return ((diffDays % 100) + 1);
}

/**
 * Check if a date is today (in UTC)
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
