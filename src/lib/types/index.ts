/**
 * Central type definitions export
 * Import all types from this single file for consistency
 * 
 * @example
 * import { Doctor, DoctorWithRelations, SearchDoctorData } from '@/lib/types';
 */

// Base Prisma model types and enums
export * from "./prisma";

// Common relation patterns and dashboard types
export * from "./relations";

// Search-specific types
export * from "./search";
