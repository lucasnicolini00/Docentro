import { getRequestConfig } from "next-intl/server";
import { getMessages } from "./src/app/messages";

const ALL_NAMESPACES = [
  "common",
  "navigation",
  "dashboard_doctor",
  "dashboard_patient",
  "disclaimer",
  "featuredDoctors",
  "filtersModal",
  "footer",
  "hero",
  "howItWorks",
  "locationPicker",
  "login",
  "map",
  "mapModal",
  "modals",
  "register",
  "search",
  "specialties",
  "testimonials",
  "forms",
  "book",
  "doctor_public",
  "doctorProfile",
  "feedback",
];

export default getRequestConfig(async ({ locale }) => {
  const l = locale ?? "es";
  const messages = await getMessages(l, ALL_NAMESPACES);
  return { locale: l, messages };
});
