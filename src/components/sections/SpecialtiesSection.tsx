import { getPopularSpecialities } from "@/lib/data";
import type { Speciality } from "@prisma/client";

export default async function SpecialtiesSection() {
  const specialities: Speciality[] = await getPopularSpecialities();

  const icons = ["🫀", "🧴", "👩🏻‍🦰", "🧠", "🩻", "💊", "🔬", "🩺"];

  return (
    <section id="especialidades" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Especialidades Disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra especialistas en todas las áreas de la salud
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {specialities.map((speciality, index) => (
            <div
              key={speciality.id}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {icons[index % icons.length]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {speciality.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {speciality.description || "Atención especializada"}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors cursor-pointer">
                  Ver especialistas →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
