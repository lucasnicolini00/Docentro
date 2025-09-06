import { getDoctorClinicsAndPricing } from "@/lib/actions/appointments";
import { Navbar } from "@/components/ui/navigation";
import { AppointmentBookingForm } from "@/components/ui/forms";
import { notFound } from "next/navigation";

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { id } = await params;

  // Get doctor data with clinics and pricing
  const result = await getDoctorClinicsAndPricing(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const doctor = result.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {doctor.user.firstName[0]}
                {doctor.user.lastName[0]}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dr. {doctor.user.firstName} {doctor.user.lastName}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.specialities.map((specialty) => (
                  <span
                    key={specialty.speciality.id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {specialty.speciality.name}
                  </span>
                ))}
              </div>

              {/* Clinics */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Consultorios Disponibles
                </h3>
                <div className="space-y-2">
                  {doctor.clinics.map((clinic) => (
                    <div
                      key={clinic.clinic.id}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">
                        {clinic.clinic.name} - {clinic.clinic.address}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              {doctor.pricings.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Precios de Consulta
                  </h3>
                  <div className="space-y-2">
                    {doctor.pricings.map((pricing) => (
                      <div
                        key={pricing.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">
                          {pricing.clinic.name} - Consulta
                        </span>
                        <span className="font-semibold text-green-600">
                          ${pricing.consultationFee.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Book Appointment Button */}
            <div className="flex-shrink-0">
              <a
                href={`/book/${doctor.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <span>📅</span>
                <span>Agendar Cita</span>
              </a>
            </div>
          </div>
        </div>

        {/* Appointment Booking Form */}
        <AppointmentBookingForm doctor={doctor} />
      </div>
    </div>
  );
}
