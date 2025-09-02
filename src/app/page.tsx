export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Docentro</div>
        <nav className="space-x-6 text-sm text-gray-700">
          <a href="#">Inicio</a>
          <a href="#">Especialidades</a>
          <a href="#">Profesionales</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      {/* Hero Search */}
      <section className="bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Encuentra al profesional de salud ideal para ti
        </h1>
        <p className="mb-6 text-gray-600">
          Agenda citas con psicólogos, médicos y más
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="¿Qué especialidad estás buscando?"
            className="w-full px-4 py-2 rounded border"
          />
          <input
            type="text"
            placeholder="Ciudad o ubicación"
            className="w-full px-4 py-2 rounded border"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Buscar
          </button>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Especialidades populares
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {["Psicólogo", "Dentista", "Nutricionista", "Médico General"].map(
            (item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition"
              >
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full mb-2"></div>
                <p>{item}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Profesionales recomendados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-bold">Lic. Lucía Ramos</h3>
                  <p className="text-sm text-gray-600">Psicóloga - Córdoba</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                ⭐ 5.0 (127 opiniones)
              </p>
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded w-full">
                Ver perfil
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-blue-50 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
        <p className="mb-10 text-gray-600">
          Es fácil encontrar a tu profesional ideal
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {["Busca un especialista", "Revisa opiniones", "Agenda tu cita"].map(
            (text, i) => (
              <div key={i} className="bg-white rounded p-6 shadow">
                <div className="w-12 h-12 bg-blue-200 mx-auto mb-4 rounded-full" />
                <p>{text}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-sm text-center text-gray-500">
        © 2025 Docentro Bolivia S.A. Todos los derechos reservados.
      </footer>
    </div>
  );
}
