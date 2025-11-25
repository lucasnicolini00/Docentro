
"use client";

import { useState, useEffect, useCallback } from "react";
import { getDoctorAvailability } from "@/lib/actions/appointments";
import dynamic from "next/dynamic";
const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });
import { Doctor, DayInfo } from "./doctor-card/types";
import { DoctorInfo } from "./doctor-card/DoctorInfo";
import { ClinicInfo } from "./doctor-card/ClinicInfo";
import { ClinicSelector } from "./doctor-card/ClinicSelector";
import { DateCarousel } from "./doctor-card/DateCarousel";
import { TimeSlotGrid } from "./doctor-card/TimeSlotGrid";
import { useTranslations } from "next-intl";


interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const t = useTranslations("search");


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
    "time-selection" | "all-times" | "quick-book" | "clinics-list"
  >("time-selection");
  const [modalSelectedTime, setModalSelectedTime] = useState<string>("");
  const [modalSelectedClinic, setModalSelectedClinic] = useState<{
    id: string;
    name: string;
    city: string | null;
    address: string | null;
  } | null>(doctor.clinics[0]?.clinic || null);

  // Generate days starting from today
  const generateDays = useCallback(
    (numDays: number): DayInfo[] => {
      const days: DayInfo[] = [];
      const today = new Date();
      for (let i = 0; i < numDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        days.push({
          date: date.toISOString().split("T")[0],
          dayName:
            i === 0
              ? t("todayShort")
              : i === 1
                ? t("tomorrowShort")
                : date
                    .toLocaleDateString(undefined, { weekday: "short" })
                    .replace(".", ""),
          dayNumber: date.getDate(),
          monthName: date
            .toLocaleDateString(undefined, { month: "short" })
            .replace(".", ""),
          fullDate: date,
          isLoading: false,
        });
      }

      return days;
    },
    [t]
  );

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
  }, [
    loadedDays,
    daysToShow,
    checkDayAvailability,
    selectedDate,
    generateDays,
  ]);

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
    [
      currentStartIndex,
      daysToShow,
      loadedDays,
      allDays,
      checkDayAvailability,
      generateDays,
    ]
  );

  // Modal handlers
  const openModal = (
    mode: "time-selection" | "all-times" | "quick-book" | "clinics-list",
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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[400px]">
        {/* Left Panel - Doctor Info */}
        <div className="lg:col-span-3 p-4 flex flex-col min-h-[400px]">
          <DoctorInfo doctor={doctor} />
          <ClinicInfo doctor={doctor} onOpenModal={openModal} />
        </div>

        {/* Right Panel - Availability */}
        <div className="lg:col-span-2 bg-gray-50 p-4 border-l border-gray-200 flex flex-col min-h-[400px]">
          <ClinicSelector
            clinics={doctor.clinics}
            selectedClinicId={selectedClinicId}
            onSelectClinic={setSelectedClinicId}
          />

          <DateCarousel
            visibleDays={visibleDays}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onNavigate={navigateCarousel}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
          />

          <TimeSlotGrid
            availableSlots={availableSlots}
            isLoading={isLoadingSlots}
            selectedDate={selectedDate}
            onSelectTime={(time) => openModal("time-selection", time)}
            doctor={doctor}
            selectedClinicId={selectedClinicId}
            allDays={allDays}
            onOpenModal={openModal}
          />
        </div>
      </div>

      {isModalOpen && (
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
      )}
    </div>
  );
}

