/**
 * Type definitions for search-related operations
 * These types ensure consistency between database queries, server actions, and frontend components
 */

/**
 * Clinic fields returned from search queries
 * MUST match the select statement in searchService
 */
export interface SearchClinicData {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  isVirtual: boolean;
}

/**
 * Speciality fields returned from search queries
 */
export interface SearchSpecialityData {
  id: string;
  name: string;
}

/**
 * Opinion fields returned from search queries
 */
export interface SearchOpinionData {
  id: string;
  rating: number;
}

/**
 * Pricing fields returned from search queries
 * MUST match the select statement in searchService
 */
export interface SearchPricingData {
  id: string;
  price: number;
  currency: string;
  title: string;
  clinic: {
    id: string;
    name: string;
  };
}

/**
 * Raw pricing data from database (before Decimal conversion)
 */
export interface RawPricingData {
  id: string;
  price: number | { toNumber: () => number }; // Prisma Decimal (can be number after conversion)
  currency: string;
  title: string;
  clinic: {
    id: string;
    name: string;
  };
}

/**
 * Profile image fields
 */
export interface ProfileImageData {
  id: string;
  url: string;
}

/**
 * User fields returned from doctor queries
 */
export interface DoctorUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

/**
 * Raw doctor data from database (before transformation)
 * This represents what Prisma returns (with Decimal types)
 */
export interface RawDoctorData {
  id: string;
  user: DoctorUserData;
  specialities: {
    speciality: SearchSpecialityData;
  }[];
  opinions: SearchOpinionData[];
  clinics: {
    clinic: SearchClinicData;
  }[];
  pricings: RawPricingData[];
  profileImage: ProfileImageData | null;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Transformed doctor data (after flattening user fields)
 * This is what gets sent to the frontend
 */
export interface TransformedDoctorData {
  id: string;
  // Flattened user fields
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  // Relations
  user: DoctorUserData;
  specialities: {
    speciality: SearchSpecialityData;
  }[];
  opinions: SearchOpinionData[];
  clinics: {
    clinic: SearchClinicData;
  }[];
  pricings: SearchPricingData[];
  profileImage: ProfileImageData | null;
  // Optional fields not always included in search results
  experiences?: Array<{
    id: string;
    startDate: string | null;
    endDate: string | null;
    title: string;
    institution: string | null;
  }>;
  // Serialized dates
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Paginated search results
 */
export interface PaginatedDoctorResults {
  doctors: TransformedDoctorData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
