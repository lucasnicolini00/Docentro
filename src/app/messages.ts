// Static JSON imports to avoid Node fs in App Router / edge environments.
// This replaces runtime disk access with tree-shakeable bundled data.
import en_common from "../../messages/en/common.json";
import en_dashboard_doctor from "../../messages/en/dashboard_doctor.json";
import en_dashboard_patient from "../../messages/en/dashboard_patient.json";
import en_disclaimer from "../../messages/en/disclaimer.json";
import en_featuredDoctors from "../../messages/en/featuredDoctors.json";
import en_filtersModal from "../../messages/en/filtersModal.json";
import en_footer from "../../messages/en/footer.json";
import en_hero from "../../messages/en/hero.json";
import en_howItWorks from "../../messages/en/howItWorks.json";
import en_locationPicker from "../../messages/en/locationPicker.json";
import en_login from "../../messages/en/login.json";
import en_map from "../../messages/en/map.json";
import en_mapModal from "../../messages/en/mapModal.json";
import en_register from "../../messages/en/register.json";
import en_search from "../../messages/en/search.json";
import en_specialties from "../../messages/en/specialties.json";
import en_testimonials from "../../messages/en/testimonials.json";
import en_forms from "../../messages/en/forms.json";
import en_book from "../../messages/en/book.json";
import en_doctor_public from "../../messages/en/doctor_public.json";
import en_doctorProfile from "../../messages/en/doctorProfile.json";
import en_feedback from "../../messages/en/feedback.json";
import en_navigation from "../../messages/en/navigation.json";
import en_modals from "../../messages/en/modals.json";

import es_common from "../../messages/es/common.json";
import es_dashboard_doctor from "../../messages/es/dashboard_doctor.json";
import es_dashboard_patient from "../../messages/es/dashboard_patient.json";
import es_disclaimer from "../../messages/es/disclaimer.json";
import es_featuredDoctors from "../../messages/es/featuredDoctors.json";
import es_filtersModal from "../../messages/es/filtersModal.json";
import es_footer from "../../messages/es/footer.json";
import es_hero from "../../messages/es/hero.json";
import es_howItWorks from "../../messages/es/howItWorks.json";
import es_locationPicker from "../../messages/es/locationPicker.json";
import es_login from "../../messages/es/login.json";
import es_map from "../../messages/es/map.json";
import es_mapModal from "../../messages/es/mapModal.json";
import es_register from "../../messages/es/register.json";
import es_search from "../../messages/es/search.json";
import es_specialties from "../../messages/es/specialties.json";
import es_testimonials from "../../messages/es/testimonials.json";
import es_forms from "../../messages/es/forms.json";
import es_book from "../../messages/es/book.json";
import es_doctor_public from "../../messages/es/doctor_public.json";
import es_doctorProfile from "../../messages/es/doctorProfile.json";
import es_feedback from "../../messages/es/feedback.json";
import es_navigation from "../../messages/es/navigation.json";
import es_modals from "../../messages/es/modals.json";

const MESSAGE_BUNDLE: Record<string, Record<string, any>> = {
  en: {
    common: en_common,
    dashboard_doctor: en_dashboard_doctor,
    dashboard_patient: en_dashboard_patient,
    disclaimer: en_disclaimer,
    featuredDoctors: en_featuredDoctors,
    filtersModal: en_filtersModal,
    footer: en_footer,
    hero: en_hero,
    howItWorks: en_howItWorks,
    locationPicker: en_locationPicker,
    login: en_login,
    map: en_map,
    mapModal: en_mapModal,
    register: en_register,
    search: en_search,
    specialties: en_specialties,
    testimonials: en_testimonials,
    forms: en_forms,
    book: en_book,
    doctor_public: en_doctor_public,
    doctorProfile: en_doctorProfile,
    feedback: en_feedback,
    navigation: en_navigation,
    modals: en_modals,
  },
  es: {
    common: es_common,
    dashboard_doctor: es_dashboard_doctor,
    dashboard_patient: es_dashboard_patient,
    disclaimer: es_disclaimer,
    featuredDoctors: es_featuredDoctors,
    filtersModal: es_filtersModal,
    footer: es_footer,
    hero: es_hero,
    howItWorks: es_howItWorks,
    locationPicker: es_locationPicker,
    login: es_login,
    map: es_map,
    mapModal: es_mapModal,
    register: es_register,
    search: es_search,
    specialties: es_specialties,
    testimonials: es_testimonials,
    forms: es_forms,
    book: es_book,
    doctor_public: es_doctor_public,
    doctorProfile: es_doctorProfile,
    feedback: es_feedback,
    navigation: es_navigation,
    modals: es_modals,
  },
};

// Auto-detect all namespaces from the bundle (single source of truth)
export const MESSAGE_NAMESPACES = Object.keys(MESSAGE_BUNDLE.en);

export async function getMessages(locale: string, namespaces: string[]) {
  const localeBundle = MESSAGE_BUNDLE[locale] || MESSAGE_BUNDLE.en;
  const result: Record<string, any> = {};
  for (const ns of namespaces) {
    if (localeBundle[ns]) {
      result[ns] = localeBundle[ns];
    }
  }
  return result;
}
