// Export all server actions from one place for easy importing

// Authentication actions
export {
  registerAction,
  loginAction,
  logoutAction,
  getCurrentUser,
} from "./auth";

// Clinic and Pricing actions
export {
  getDoctorClinics,
  createClinic,
  updateClinic,
  createPricing,
  updatePricing,
  togglePricingStatus,
} from "./clinics";

// Schedule actions
export {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getDoctorSchedules,
  getAvailableTimeSlots,
  toggleTimeSlotBlock,
} from "./schedules";

// Patient actions
export {
  updatePatientProfile,
  getPatientProfile,
  getPatientDashboard,
} from "./patients";

// Doctor actions
export {
  updateDoctorProfile,
  getDoctorSpecialities,
  getDoctorProfile,
  getDoctorDashboard,
  saveDoctorProfileExperience,
} from "./doctors";

// Search and general data actions
export {
  getPopularSpecialities,
  getAllSpecialities,
  getAllCities,
  getFeaturedDoctors,
  searchDoctors,
  getAllDoctors,
} from "./search";

// Appointment actions
export {
  createAppointment,
  getDoctorAvailability,
  getDoctorClinicsAndPricing,
  updateAppointmentStatus,
  cancelAppointment,
} from "./appointments";

// Utility functions and types
export {
  validateAuth,
  validatePatient,
  validateDoctor,
  type ActionResult,
} from "./utils";

// Analytics actions
export {
  getDashboardStats,
  getScheduleAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
} from "./analytics";

// Time Slots actions
export {
  getTimeSlotsForBooking,
  getDoctorWeeklySchedule,
  getAvailabilityOverview,
  getTimeSlotsForCalendarAction,
} from "./timeSlots";
