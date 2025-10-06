export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🩺 Docentro
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              La plataforma líder en Bolivia para conectar pacientes con
              profesionales de la salud. Agenda tu consulta de forma segura y
              confiable.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                📘
              </button>
              <button className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                🐦
              </button>
              <button className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                📷
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#especialidades"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Especialidades
                </a>
              </li>
              <li>
                <a
                  href="#profesionales"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Profesionales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-3">📍</span>
                <span className="text-gray-300">La Paz, Bolivia</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span className="text-gray-300">+591 2 123-4567</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">✉️</span>
                <span className="text-gray-300">contacto@docentro.bo</span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Docentro Bolivia S.A. Todos los derechos reservados.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
