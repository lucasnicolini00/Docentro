export interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthlyRevenue: number;
  utilizationRate: number;
  pendingBookings: number;
  totalPatients: number;
  changes?: {
    appointmentDay: {
      value: number;
      type: "increase" | "decrease" | "neutral";
    };
    appointmentWeek: {
      value: number;
      type: "increase" | "decrease" | "neutral";
    };
    revenue: {
      value: number;
      type: "increase" | "decrease" | "neutral";
    };
    utilization: {
      value: number;
      type: "increase" | "decrease" | "neutral";
    };
    patients: {
      value: number;
      type: "increase" | "decrease" | "neutral";
    };
  };
}

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export interface Activity {
  id: string;
  type: string;
  icon: string;
  title: string;
  timestamp: Date;
  iconColor: string;
}

export interface UpcomingAppointment {
  id: string;
  patientName: string;
  pricingTitle: string | null;
  status: string;
  datetime: Date;
}
