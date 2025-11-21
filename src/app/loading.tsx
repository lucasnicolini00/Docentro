// Root loading (outside locale). Keep it minimal without translations or Navbar.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="h-14 w-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-600">Cargando…</p>
      </div>
    </div>
  );
}
