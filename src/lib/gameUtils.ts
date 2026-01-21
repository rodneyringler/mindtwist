// Game utility functions

// Timezone for day calculations - Eastern Time (handles EST/EDT automatically)
const TIMEZONE = 'America/New_York';

// The start date for day calculations - midnight Eastern Time on Jan 1, 2026
// This is 5:00 AM UTC (EST is UTC-5)
const START_DATE = new Date('2026-01-01T05:00:00Z');

/**
 * Get date components in Eastern Time
 */
function getEasternDateComponents(date: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const parts = formatter.formatToParts(date);
  return {
    year: parseInt(parts.find(p => p.type === 'year')!.value),
    month: parseInt(parts.find(p => p.type === 'month')!.value) - 1,
    day: parseInt(parts.find(p => p.type === 'day')!.value),
  };
}

/**
 * Get the current day number based on the start date
 * Day 1 starts on START_DATE, and increments by 1 each day at midnight Eastern Time
 * Cycles through 1-100 to allow infinite play
 */
export function getCurrentDayNumber(): number {
  const now = new Date();
  const startEastern = getEasternDateComponents(START_DATE);
  const nowEastern = getEasternDateComponents(now);

  // Calculate days between the two Eastern dates
  const startDate = Date.UTC(startEastern.year, startEastern.month, startEastern.day);
  const nowDate = Date.UTC(nowEastern.year, nowEastern.month, nowEastern.day);
  const diffDays = Math.floor((nowDate - startDate) / (1000 * 60 * 60 * 24));

  // Cycle through days 1-100
  return ((diffDays % 100) + 1);
}

/**
 * Check if a date is today (in Eastern Time)
 */
export function isToday(date: Date): boolean {
  const todayEastern = getEasternDateComponents(new Date());
  const dateEastern = getEasternDateComponents(date);
  return (
    dateEastern.year === todayEastern.year &&
    dateEastern.month === todayEastern.month &&
    dateEastern.day === todayEastern.day
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
