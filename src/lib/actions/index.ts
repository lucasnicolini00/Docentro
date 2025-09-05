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
  getAllSpecialities,
  getDoctorDashboard,
} from "./doctors";

// Search and general data actions
export {
  getPopularSpecialities,
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
