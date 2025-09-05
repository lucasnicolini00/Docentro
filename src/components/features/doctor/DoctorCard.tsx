import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";

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
      name: string;
      city: string | null;
      address: string | null;
    };
  }[];
  pricings: {
    price: Decimal;
    currency: string;
    title: string;
    clinic: {
      name: string;
    };
  }[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const avgRating =
    doctor.opinions.length > 0
      ? doctor.opinions.reduce((sum, opinion) => sum + opinion.rating, 0) /
        doctor.opinions.length
      : 0;

  const primarySpeciality =
    doctor.specialities[0]?.speciality?.name || "Especialista";
  const primaryClinic = doctor.clinics[0]?.clinic;
  const location = primaryClinic?.city || "Ubicación no especificada";
  const clinicName = primaryClinic?.name || "Clínica no especificada";
  const address = primaryClinic?.address || "";

  const lowestPrice =
    doctor.pricings.length > 0
      ? Math.min(...doctor.pricings.map((p) => Number(p.price)))
      : null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-6">
        {/* Doctor Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl text-white font-bold">
            {doctor.name.charAt(0)}
            {doctor.surname.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">
                Dr. {doctor.name} {doctor.surname}
              </h3>
              <span className="text-green-500 text-sm">✔️</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{primarySpeciality}</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400 text-sm">
                {"★".repeat(Math.round(avgRating))}
                {"☆".repeat(5 - Math.round(avgRating))}
              </div>
              <span className="text-gray-600 text-sm">
                {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
              </span>
              <span className="text-gray-500 text-sm">
                ({doctor.opinions.length} opiniones)
              </span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Ubicación</h4>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span>🏥</span>
              {clinicName}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span>📍</span>
              {location} {address && `· ${address}`}
            </p>
            <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors cursor-pointer">
              Ver en mapa →
            </button>
          </div>
        </div>

        {/* Pricing */}
        {lowestPrice && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Consulta</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Desde</span>
              <span className="font-bold text-lg text-green-600">
                ${lowestPrice.toLocaleString()}{" "}
                {doctor.pricings[0]?.currency || "ARS"}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/doctor/${doctor.id}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-center"
          >
            Ver Perfil Completo
          </Link>
          <Link
            href={`/doctor/${doctor.id}#booking`}
            className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl transition-colors font-medium text-center"
          >
            Agendar Cita
          </Link>
        </div>

        {/* Contact Options */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            {doctor.phone && (
              <button className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                📞 Llamar
              </button>
            )}
            <button className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
              💬 Consulta Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
