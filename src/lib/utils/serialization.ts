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

  // Handle objects
  if (typeof obj === "object") {
    const converted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
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
 */
export function convertDoctorDecimals<T extends Record<string, unknown>>(
  doctor: T
): T {
  // Convert pricings array if present
  if (Array.isArray(doctor.pricings)) {
    const convertedPricings = doctor.pricings.map((pricing: Record<string, unknown>) => ({
      ...pricing,
      price: pricing.price ? decimalToNumber(pricing.price) : pricing.price,
    }));
    
    return {
      ...doctor,
      pricings: convertedPricings,
    };
  }
  
  return doctor;
}
