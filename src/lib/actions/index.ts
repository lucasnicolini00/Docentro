// Export all server actions from one place for easy importing

// Authentication actions
export {
  registerAction,
  loginAction,
  logoutAction,
  getCurrentUser,
} from "./auth";

// Patient actions
export { updatePatientProfile } from "./patients";

// Doctor actions
export { updateDoctorProfile, getDoctorSpecialities } from "./doctors";

// Utility functions and types
export {
  validateAuth,
  validatePatient,
  validateDoctor,
  type ActionResult,
} from "./utils";
