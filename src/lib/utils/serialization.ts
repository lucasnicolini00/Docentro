/**
 * Serialization utilities for converting Prisma Decimal types to numbers
 * Provides optimized alternatives to JSON.parse(JSON.stringify()) patterns
 */

/**
 * Converts Prisma Decimal objects to numbers for client compatibility
 * More efficient than JSON.parse(JSON.stringify()) approach
 */
export function decimalToNumber(value: unknown): number | unknown {
  if (
    typeof value === "object" &&
    value !== null &&
    value.constructor?.name === "Decimal"
  ) {
    return Number(value);
  }
  return value;
}

/**
 * Recursively converts all Decimal fields in an object to numbers
 * Use for complex nested objects with Decimal fields
 * Strips out functions and non-serializable properties for client compatibility
 */
export function convertDecimalsInObject<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle Decimal type
  if (typeof obj === "object" && obj.constructor?.name === "Decimal") {
    return Number(obj) as T;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => convertDecimalsInObject(item)) as T;
  }

  // Handle Date objects - convert to ISO string
  if (obj instanceof Date) {
    return obj.toISOString() as unknown as T;
  }

  // Handle objects
  if (typeof obj === "object") {
    const converted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip functions and constructor
      if (typeof value === "function") continue;
      if (key === "constructor") continue;
      
      converted[key] = convertDecimalsInObject(value);
    }
    return converted as T;
  }

  // Primitive values
  return obj;
}

/**
 * Type-safe Decimal converter for doctor search results
 * Handles the full structure of doctor objects returned from search
 * Uses deep conversion to handle nested structures (pricings with clinic relations, etc.)
 */
export function convertDoctorDecimals<T extends Record<string, unknown>>(
  doctor: T
): T {
  // Use deep conversion to handle all nested Decimals
  return convertDecimalsInObject(doctor);
}
