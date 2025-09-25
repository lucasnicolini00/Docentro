"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDoctorAvailability } from "@/lib/actions/appointments";
import BookingModal from "./BookingModal";

interface Doctor {
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
    price: number; // Changed from Decimal to number
    currency: string;
    title: string;
    clinic: {
      name: string;
    };
  }[];
}

interface DayInfo {
  date: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  fullDate: Date;
  hasAvailableSlots?: boolean;
  isLoading?: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  // Clinic Tabs scroll logic
  const clinicTabsRef = useRef<HTMLDivElement>(null);
  const [clinicTabScrollPos, setClinicTabScrollPos] = useState(0);
  const [clinicTabScrollEnd, setClinicTabScrollEnd] = useState(false);

  const scrollClinicTabs = (direction: "left" | "right") => {
    const ref = clinicTabsRef.current;
    if (!ref) return;
    const scrollAmount = 120;
    if (direction === "left") {
      ref.scrollLeft -= scrollAmount;
    } else {
      ref.scrollLeft += scrollAmount;
    }
    setClinicTabScrollPos(ref.scrollLeft);
    setClinicTabScrollEnd(
      ref.scrollLeft + ref.offsetWidth >= ref.scrollWidth - 1
    );
  };

  useEffect(() => {
    const ref = clinicTabsRef.current;
    if (!ref) return;
    const handleScroll = () => {
      setClinicTabScrollPos(ref.scrollLeft);
      setClinicTabScrollEnd(
        ref.scrollLeft + ref.offsetWidth >= ref.scrollWidth - 1
      );
    };
    ref.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [doctor.clinics.length]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ datetime: string; time: string; clinicId: string }>
  >([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [allDays, setAllDays] = useState<DayInfo[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [daysToShow] = useState(4); // Show 4 days at a time
  const [loadedDays, setLoadedDays] = useState(7); // Start with 7 days, load more as needed

  // Clinic tab state
  const [selectedClinicId, setSelectedClinicId] = useState<string>(
    doctor.clinics[0]?.clinic.id || ""
  );

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "time-selection" | "all-times" | "quick-book"
  >("time-selection");
  const [modalSelectedTime, setModalSelectedTime] = useState<string>("");
  const [modalSelectedClinic, setModalSelectedClinic] = useState<{
    id: string;
    name: string;
    city: string | null;
    address: string | null;
  } | null>(doctor.clinics[0]?.clinic || null);

  const avgRating =
    doctor.opinions.length > 0
      ? (() => {
          const validRatings = doctor.opinions
            .map((opinion) => opinion.rating)
            .filter((rating) => !isNaN(Number(rating)) && rating > 0);
          return validRatings.length > 0
            ? validRatings.reduce((sum, rating) => sum + Number(rating), 0) /
                validRatings.length
            : 0;
        })()
      : 0;

  const primarySpeciality =
    doctor.specialities[0]?.speciality?.name || "Especialista";
  const primaryClinic = doctor.clinics[0]?.clinic;
  const location = primaryClinic?.city || "Ubicación no especificada";
  const clinicName = primaryClinic?.name || "Clínica no especificada";
  const address = primaryClinic?.address || "";

  const lowestPrice =
    doctor.pricings.length > 0
      ? (() => {
          const validPrices = doctor.pricings
            .map((p) => Number(p.price))
            .filter((price) => !isNaN(price) && price > 0);
          return validPrices.length > 0 ? Math.min(...validPrices) : null;
        })()
      : null;

  // Generate days starting from today
  const generateDays = (numDays: number): DayInfo[] => {
    const days: DayInfo[] = [];
    const today = new Date();
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      days.push({
        date: date.toISOString().split("T")[0],
        dayName: i === 0 ? "Hoy" : i === 1 ? "Mañana" : dayNames[date.getDay()],
        dayNumber: date.getDate(),
        monthName: monthNames[date.getMonth()],
        fullDate: date,
        isLoading: false,
      });
    }

    return days;
  };

  // Check availability for a specific day
  const checkDayAvailability = useCallback(
    async (day: DayInfo): Promise<DayInfo> => {
      try {
        const result = await getDoctorAvailability(doctor.id, day.date);
        return {
          ...day,
          hasAvailableSlots:
            result.success && result.data && result.data.length > 0,
          isLoading: false,
        };
      } catch (error) {
        console.error("Error checking day availability:", error);
        return {
          ...day,
          hasAvailableSlots: false,
          isLoading: false,
        };
      }
    },
    [doctor.id]
  );

  // Initialize days and check availability for visible ones
  const initializeDays = useCallback(async () => {
    const initialDays = generateDays(loadedDays);
    setAllDays(initialDays);

    // Check availability for first 4 days (initially visible)
    const visibleDays = initialDays.slice(0, daysToShow);
    const checkedDays = await Promise.all(
      visibleDays.map((day) => checkDayAvailability(day))
    );

    // Update the days with availability info
    setAllDays((prevDays) => {
      const updatedDays = [...prevDays];
      checkedDays.forEach((checkedDay, index) => {
        updatedDays[index] = checkedDay;
      });
      return updatedDays;
    });

    // Auto-select first available day
    const firstAvailable = checkedDays.find((day) => day.hasAvailableSlots);
    if (firstAvailable && !selectedDate) {
      setSelectedDate(firstAvailable.date);
    }
  }, [loadedDays, daysToShow, checkDayAvailability, selectedDate]);

  // Navigate carousel
  const navigateCarousel = useCallback(
    async (direction: "prev" | "next") => {
      if (direction === "prev" && currentStartIndex > 0) {
        setCurrentStartIndex(currentStartIndex - 1);
      } else if (direction === "next") {
        const newStartIndex = currentStartIndex + 1;
        setCurrentStartIndex(newStartIndex);

        // Load more days if approaching the end
        if (newStartIndex + daysToShow >= loadedDays - 2) {
          const newLoadedDays = loadedDays + 7;
          setLoadedDays(newLoadedDays);
          const newDays = generateDays(newLoadedDays);
          setAllDays(newDays);

          // Check availability for newly visible days
          const startCheck = Math.max(loadedDays - 7, newStartIndex);
          const endCheck = Math.min(newStartIndex + daysToShow, newLoadedDays);
          const daysToCheck = newDays.slice(startCheck, endCheck);

          const checkedNewDays = await Promise.all(
            daysToCheck.map((day) => checkDayAvailability(day))
          );

          setAllDays((prevDays) => {
            const updatedDays = [...prevDays];
            checkedNewDays.forEach((checkedDay, index) => {
              updatedDays[startCheck + index] = checkedDay;
            });
            return updatedDays;
          });
        } else {
          // Check availability for newly visible days
          const visibleDays = allDays.slice(
            newStartIndex,
            newStartIndex + daysToShow
          );
          const uncheckedDays = visibleDays.filter(
            (day) => day.hasAvailableSlots === undefined
          );

          if (uncheckedDays.length > 0) {
            const checkedDays = await Promise.all(
              uncheckedDays.map((day) => checkDayAvailability(day))
            );

            setAllDays((prevDays) => {
              const updatedDays = [...prevDays];
              checkedDays.forEach((checkedDay) => {
                const index = updatedDays.findIndex(
                  (d) => d.date === checkedDay.date
                );
                if (index !== -1) {
                  updatedDays[index] = checkedDay;
                }
              });
              return updatedDays;
            });
          }
        }
      }
    },
    [currentStartIndex, daysToShow, loadedDays, allDays, checkDayAvailability]
  );

  // Modal handlers
  const openModal = (
    mode: "time-selection" | "all-times" | "quick-book",
    time?: string
  ) => {
    setModalMode(mode);
    setModalSelectedTime(time || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalSelectedTime("");
  };

  // Load available slots when date or clinic is selected
  const loadAvailableSlots = useCallback(
    async (date: string) => {
      setIsLoadingSlots(true);
      try {
        // Only pass doctorId and date, store all slots
        const result = await getDoctorAvailability(doctor.id, date);
        if (result.success) {
          setAvailableSlots(result.data || []);
        } else {
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error("Error loading slots:", error);
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    },
    [doctor.id]
  );

  // Load available days on component mount
  useEffect(() => {
    initializeDays();
  }, [initializeDays]);

  useEffect(() => {
    if (selectedDate && selectedClinicId) {
      loadAvailableSlots(selectedDate);
      const clinicObj = doctor.clinics.find(
        (c) => c.clinic.id === selectedClinicId
      )?.clinic;
      setModalSelectedClinic(clinicObj || null);
    }
  }, [selectedDate, selectedClinicId, loadAvailableSlots, doctor.clinics]);

  // Get currently visible days
  const visibleDays = allDays.slice(
    currentStartIndex,
    currentStartIndex + daysToShow
  );
  const canGoPrev = currentStartIndex > 0;
  const canGoNext =
    currentStartIndex + daysToShow < allDays.length ||
    currentStartIndex + daysToShow < 30; // Allow up to 30 days

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel - Doctor Info */}
        <div className="flex-1 p-6 flex flex-col min-h-[400px]">
          {/* Doctor Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl text-white font-bold shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Dr. {doctor.name} {doctor.surname}
                </h3>
                <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded-full">
                  ✓ Verificado
                </span>
              </div>
              <p className="text-gray-600 mb-3 font-medium">
                {primarySpeciality}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(avgRating)
                          ? "fill-current"
                          : "stroke-current fill-transparent"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
                </span>
                <span className="text-gray-500 text-sm">
                  ({doctor.opinions.length} opiniones)
                </span>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900">
                {doctor.clinics.length > 1 ? "Ubicaciones" : "Ubicación"}
              </span>
            </div>
            {doctor.clinics.length > 1 ? (
              <div className="space-y-2">
                {doctor.clinics.slice(0, 2).map((doctorClinic, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-gray-700 font-medium">
                      {doctorClinic.clinic.name}
                    </p>
                    <p className="text-gray-600">
                      {doctorClinic.clinic.city}
                      {doctorClinic.clinic.address &&
                        ` • ${doctorClinic.clinic.address}`}
                    </p>
                  </div>
                ))}
                {doctor.clinics.length > 2 && (
                  <p className="text-xs text-blue-600 font-medium">
                    +{doctor.clinics.length - 2} ubicación
                    {doctor.clinics.length - 2 > 1 ? "es" : ""} más
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-700 mb-1">{clinicName}</p>
                <p className="text-sm text-gray-600">
                  {location} {address && `• ${address}`}
                </p>
              </div>
            )}
          </div>

          {/* Pricing */}
          {lowestPrice && (
            <div className="mb-6">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-gray-700 font-medium">
                  Consulta desde:
                </span>
                <span className="font-bold text-xl text-green-600">
                  ${lowestPrice.toLocaleString()}{" "}
                  {doctor.pricings[0]?.currency || "ARS"}
                </span>
              </div>
            </div>
          )}

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1"></div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="space-y-3 mt-auto">
            <Link
              href={`/doctor/${doctor.id}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-center"
            >
              Ver Perfil Completo
            </Link>

            {doctor.phone && (
              <button className="flex items-center justify-center gap-2 w-full text-gray-600 hover:text-gray-800 py-2 px-3 border border-gray-300 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Llamar</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Availability */}
        <div className="lg:w-80 bg-gray-50 p-6 border-l border-gray-200 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Disponibilidad</h4>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                className="p-1 bg-white rounded-full shadow border border-gray-200 text-blue-600 hover:bg-blue-50 disabled:opacity-40"
                onClick={() => scrollClinicTabs("left")}
                aria-label="Scroll left"
                disabled={clinicTabScrollPos === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 bg-white rounded-full shadow border border-gray-200 text-blue-600 hover:bg-blue-50 disabled:opacity-40"
                onClick={() => scrollClinicTabs("right")}
                aria-label="Scroll right"
                disabled={clinicTabScrollEnd}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clinic Tabs - Scrollable, scrollbar hidden */}
          <div className="mb-4">
            <div
              className="flex gap-2  overflow-hidden px-1"
              ref={clinicTabsRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {doctor.clinics.map(({ clinic }) => (
                <button
                  key={clinic.id}
                  onClick={() => setSelectedClinicId(clinic.id)}
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedClinicId === clinic.id
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {clinic.name}
                </button>
              ))}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              <label className="font-medium">Direccion: </label>
              {
                doctor.clinics.find((c) => c.clinic.id === selectedClinicId)
                  ?.clinic.address
              }
            </div>
          </div>

          {/* Date Selection Carousel */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Fechas disponibles</span>
              <div className="flex gap-1">
                <button
                  onClick={() => navigateCarousel("prev")}
                  disabled={!canGoPrev}
                  className={`p-1 rounded ${
                    canGoPrev
                      ? "text-blue-600 hover:bg-blue-50"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateCarousel("next")}
                  disabled={!canGoNext}
                  className={`p-1 rounded ${
                    canGoNext
                      ? "text-blue-600 hover:bg-blue-50"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {visibleDays.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  disabled={day.isLoading || day.hasAvailableSlots === false}
                  className={`p-2 rounded-lg border text-center transition-all relative ${
                    selectedDate === day.date
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : day.hasAvailableSlots === false
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : day.hasAvailableSlots === true
                      ? "bg-white text-gray-700 border-green-200 hover:border-green-400 hover:bg-green-50"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="text-xs font-medium">{day.dayName}</div>
                  <div className="text-sm font-bold">{day.dayNumber}</div>
                  <div className="text-xs font-medium">{day.monthName}</div>

                  {/* Availability indicator */}
                  {day.isLoading ? (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    </div>
                  ) : day.hasAvailableSlots === true ? (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                  ) : day.hasAvailableSlots === false ? (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots - Flexible content area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              {!selectedDate ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Selecciona una fecha para ver los horarios disponibles
                  </p>
                </div>
              ) : isLoadingSlots ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                  <p className="text-sm text-gray-500">Cargando horarios...</p>
                </div>
              ) : (
                (() => {
                  // Filter slots by selected clinic
                  const slotsForClinic = availableSlots.filter(
                    (slot) => slot.clinicId === selectedClinicId
                  );
                  const slotsToShow =
                    slotsForClinic.length > 0 ? slotsForClinic : availableSlots;
                  return slotsToShow.length > 0 ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        Horarios disponibles para{" "}
                        {allDays.find((d) => d.date === selectedDate)?.dayName}{" "}
                        en{" "}
                        {
                          doctor.clinics.find(
                            (c) => c.clinic.id === selectedClinicId
                          )?.clinic.name
                        }
                        :
                      </p>
                      <div className="grid grid-cols-2 gap-2 max-h-36 rounded-lg border border-gray-200 overflow-y-auto p-2">
                        {slotsToShow.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              openModal("time-selection", slot.time)
                            }
                            className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 py-2 px-3 rounded-lg text-center text-sm font-medium transition-colors"
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        No hay horarios disponibles para esta fecha en{" "}
                        {
                          doctor.clinics.find(
                            (c) => c.clinic.id === selectedClinicId
                          )?.clinic.name
                        }
                      </p>
                      <Link
                        href={`/doctor/${doctor.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver otras fechas →
                      </Link>
                    </div>
                  );
                })()
              )}
            </div>
          </div>

          {/* Quick Book Button - Fixed at bottom, aligned with Ver Perfil Completo */}
          <div className="mt-auto pt-4">
            {selectedDate && availableSlots.length > 0 ? (
              <button
                onClick={() => openModal("quick-book")}
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-center"
              >
                Agendar Cita Rápida
              </button>
            ) : (
              <div className="h-[52px]"></div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={modalSelectedTime}
        selectedClinic={modalSelectedClinic}
        mode={modalMode}
        onBookingConfirmed={() => {
          if (selectedDate) loadAvailableSlots(selectedDate);
        }}
      />
    </div>
  );
}
