export default function HowItWorksSection() {
  const steps = [
    {
      icon: "🔍",
      title: "Busca un Especialista",
      description:
        "Encuentra profesionales por especialidad, ubicación o síntomas específicos",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "⭐",
      title: "Revisa Opiniones",
      description:
        "Lee reseñas reales de otros pacientes y compara perfiles de especialistas",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "📅",
      title: "Agenda tu Cita",
      description:
        "Reserva tu consulta de forma segura y recibe confirmación inmediata",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tres simples pasos para conectarte con tu profesional ideal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center relative z-10">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-3xl shadow-lg`}
                >
                  {step.icon}
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
