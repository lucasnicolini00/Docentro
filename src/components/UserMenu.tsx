import { getCurrentUser, logoutAction } from "@/lib/actions";
import Link from "next/link";

export default async function UserMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors font-medium cursor-pointer"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Hola, {user.email}</span>
      <form action={logoutAction}>
        <button
          type="submit"
          className="text-gray-700 hover:text-red-600 font-medium cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </form>
    </div>
  );
}
