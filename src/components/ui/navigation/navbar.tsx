import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              🩺 Docentro
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Inicio
            </a>
            <a
              href="#especialidades"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Especialidades
            </a>
            <a
              href="#profesionales"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Profesionales
            </a>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contacto
            </a>
          </nav>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
