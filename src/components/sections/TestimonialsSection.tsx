export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      specialty: "Cardiología",
      rating: 5,
      comment:
        "Encontré al cardiólogo perfecto para mi tratamiento. El proceso fue muy fácil y rápido.",
      avatar: "👩‍💼",
    },
    {
      name: "Carlos Mendoza",
      specialty: "Dermatología",
      rating: 5,
      comment:
        "Excelente plataforma. Pude agendar mi cita dermatológica sin complicaciones.",
      avatar: "👨‍💻",
    },
    {
      name: "Ana Rodríguez",
      specialty: "Pediatría",
      rating: 5,
      comment:
        "Como madre, es tranquilizador encontrar pediatras de confianza tan fácilmente.",
      avatar: "👩‍🏫",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que Dicen Nuestros Pacientes
          </h2>
          <p className="text-xl text-gray-600">
            Testimonios reales de personas que encontraron su especialista ideal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.specialty}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="text-gray-700 italic">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
