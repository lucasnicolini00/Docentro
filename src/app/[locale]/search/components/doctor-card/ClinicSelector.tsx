import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { Doctor } from "./types";

interface ClinicSelectorProps {
  clinics: Doctor["clinics"];
  selectedClinicId: string;
  onSelectClinic: (id: string) => void;
}

export function ClinicSelector({
  clinics,
  selectedClinicId,
  onSelectClinic,
}: ClinicSelectorProps) {
  const t = useTranslations("search");
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
  }, [clinics.length]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">
            {t("availabilityLabel")}
          </h4>
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
          className="flex gap-2 overflow-hidden px-1"
          ref={clinicTabsRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {clinics.map(({ clinic }) => (
            <button
              key={clinic.id}
              onClick={() => onSelectClinic(clinic.id)}
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
          <label className="font-medium">{t("addressLabel")} </label>
          {
            clinics.find((c) => c.clinic.id === selectedClinicId)?.clinic
              .address
          }
        </div>
      </div>
    </>
  );
}
