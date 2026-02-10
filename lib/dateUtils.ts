/**
 * Date utility functions for consistent date handling across the app
 * 
 * Standard pattern:
 * - Database (Prisma): DateTime → JS Date objects
 * - UI forms: string ("YYYY-MM-DD") for <input type="date" />
 * - Server actions: convert string → Date using Zod z.coerce.date()
 */

/**
 * Convert Date to string for date input value
 * Returns empty string if date is null/undefined/invalid
 */
export function toDateInputValue(date?: Date | string | null): string {
  if (!date) return ""
  const d = typeof date === "string" ? new Date(date) : date
  if (!d || Number.isNaN(d.getTime())) return ""
  return d.toISOString().slice(0, 10)
}

/**
 * Parse date input string to Date object
 * Returns null if value is empty or invalid
 */
export function parseDateInput(value?: string | null): Date | null {
  if (!value || value.trim() === "") return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d
}
