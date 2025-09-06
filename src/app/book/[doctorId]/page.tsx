import { notFound } from "next/navigation";
import { requirePatient } from "@/lib/auth-guards";
import { AppointmentBooking } from "@/components/features";
import { Navbar } from "@/components/ui/navigation";

async function getDoctorForBooking(doctorId: string) {
  const { default: prisma } = await import("@/lib/prisma");

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      specialities: {
        include: {
          speciality: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
      clinics: {
        include: {
          clinic: {
            select: {
              id: true,
              name: true,
              address: true,
              isVirtual: true,
            },
          },
        },
      },
      pricings: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          title: true,
          price: true,
          currency: true,
          durationMinutes: true,
          description: true,
          clinicId: true,
        },
      },
    },
  });

  if (!doctor) {
    return null;
  }

  // Transform the data to match our component interface
  return {
    id: doctor.id,
    name: doctor.user.firstName,
    surname: doctor.user.lastName,
    specialities: doctor.specialities.map((ds) => ({
      speciality: {
        name: ds.speciality.name,
        description: ds.speciality.description,
      },
    })),
    clinics: doctor.clinics.map((dc) => dc.clinic),
    pricings: doctor.pricings.map((pricing) => ({
      id: pricing.id,
      title: pricing.title,
      price: Number(pricing.price),
      currency: pricing.currency,
      durationMinutes: pricing.durationMinutes,
      description: pricing.description,
      clinicId: pricing.clinicId,
    })),
  };
}

interface PageProps {
  params: Promise<{
    doctorId: string;
  }>;
}

export default async function BookAppointmentPage({ params }: PageProps) {
  await requirePatient();

  const { doctorId } = await params;
  const doctor = await getDoctorForBooking(doctorId);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {doctor.name.charAt(0)}
                {doctor.surname.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dr. {doctor.name} {doctor.surname}
              </h1>
              <div className="flex flex-wrap gap-2 mt-1">
                {doctor.specialities.map((ds, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {ds.speciality.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Booking Form */}
        <AppointmentBooking
          doctor={{
            id: doctor.id,
            name: doctor.name,
            surname: doctor.surname,
            specialities: doctor.specialities,
          }}
          clinics={doctor.clinics}
          pricings={doctor.pricings}
        />
      </div>
    </div>
  );
}
