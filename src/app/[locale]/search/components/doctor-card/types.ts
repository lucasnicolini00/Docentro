/**
 * Clinic information returned from search queries
 * Must match the fields selected in searchService
 */
export interface SearchClinic {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  isVirtual: boolean;
}

/**
 * Speciality information
 */
export interface SearchSpeciality {
  id: string;
  name: string;
}

/**
 * Opinion/rating information
 */
export interface SearchOpinion {
  id: string;
  rating: number;
}

/**
 * Pricing information with clinic details
 */
export interface SearchPricing {
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
 * Profile image information
 */
export interface ProfileImage {
  id: string;
  url: string;
}

/**
 * Doctor data structure returned from search queries
 * This interface ensures type safety between backend and frontend
 */
export interface Doctor {
  id: string;
  // User info - flattened from user relation in backend
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  // Relations
  specialities: {
    speciality: SearchSpeciality;
  }[];
  opinions: SearchOpinion[];
  clinics: {
    clinic: SearchClinic;
  }[];
  pricings: SearchPricing[];
  profileImage?: ProfileImage | null;
}

export interface DayInfo {
  date: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  fullDate: Date;
  hasAvailableSlots?: boolean;
  isLoading?: boolean;
}
