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
      text: string;
    };
    appointmentWeek: {
      value: number;
      type: "increase" | "decrease" | "neutral";
      text: string;
    };
    revenue: {
      value: number;
      type: "increase" | "decrease" | "neutral";
      text: string;
    };
    utilization: {
      value: number;
      type: "increase" | "decrease" | "neutral";
      text: string;
    };
    patients: {
      value: number;
      type: "increase" | "decrease" | "neutral";
      text: string;
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
  timeAgo: string;
  iconColor: string;
}

export interface UpcomingAppointment {
  id: string;
  patientName: string;
  type: string;
  time: string;
  date: string;
  status: string;
  datetime: Date;
}
