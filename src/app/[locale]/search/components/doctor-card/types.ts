export interface Doctor {
  id: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  specialities: {
    speciality: {
      name: string;
    };
  }[];
  opinions: {
    rating: number;
  }[];
  clinics: {
    clinic: {
      id: string;
      name: string;
      city: string | null;
      address: string | null;
    };
  }[];
  pricings: {
    price: number;
    currency: string;
    title: string;
    clinic: {
      name: string;
    };
  }[];
  profileImage?: {
    id: string;
    url: string;
  } | null;
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
