import { Prisma } from "@prisma/client"

/**
 * Prisma JSON field null handling helpers
 *
 * CONVENTION:
 * - For optional Json? fields, when there is no value: omit the field (undefined)
 * - If you need to explicitly store JSON null: use Prisma.JsonNull
 * - Never use raw `null` for Prisma JSON fields
 *
 * This ensures type safety and correct database behavior.
 */

/**
 * JSON null value for Prisma JSON fields
 * Use this when you need to explicitly store JSON null in the database
 */
export const JSON_NULL = Prisma.JsonNull

/**
 * Database NULL value for Prisma JSON fields
 * Use this only if you need to distinguish between JSON null and DB null
 * For optional Json? fields, prefer omitting the field (undefined) instead
 */
export const DB_NULL = Prisma.DbNull

/**
 * Helper to safely handle optional JSON fields
 * Returns undefined if value is null/undefined, otherwise returns the value
 * Use this when you want to omit optional JSON fields that have no value
 */
export function optionalJson<T>(value: T | null | undefined): T | undefined {
  return value === null || value === undefined ? undefined : value
}

/**
 * Type helper for Prisma JSON input values
 */
export type JsonInput = Prisma.InputJsonValue | typeof Prisma.JsonNull
