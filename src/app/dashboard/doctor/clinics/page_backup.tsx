import { requireDoctor } from "@/lib/auth-guards";
import { getDoctorClinics } from "@/lib/actions/clinics";
import { ClinicsPageWrapper } from "@/components/ui/navigation";
import ClinicsManagement from "./components/ClinicsManagement";

export default async function DoctorClinicsPage() {
  // Ensure user is authenticated as a doctor
  await requireDoctor();

  // Get doctor clinics data using Server Action
  const result = await getDoctorClinics();

  if (!result.success || !result.data) {
    return (
      <ClinicsPageWrapper>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar las clínicas
          </h2>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </ClinicsPageWrapper>
    );
  }

  const { clinics } = result.data;

  return (
    <ClinicsPageWrapper>
      <ClinicsManagement initialClinics={clinics} />
    </ClinicsPageWrapper>
  );
}

// This would normally be a server component, but for demo purposes with forms, making it client
export default function DoctorClinics() {
  const [showClinicForm, setShowClinicForm] = useState(false);
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | undefined>();
  const [editingClinic, setEditingClinic] = useState<any>(null);
  const [editingPricing, setEditingPricing] = useState<any>(null);

  // Mock data - in real app this would come from database
  const [clinics, setClinics] = useState([
    {
      id: "1",
      name: "Clínica Central",
      address: "Av. Principal 123, Santiago Centro",
      isVirtual: false,
      country: "Chile",
      city: "Santiago",
      neighborhood: "Centro",
      pricings: [
        {
          id: "1",
          title: "Consulta General",
          price: 50000,
          currency: "CLP",
          durationMinutes: 30,
          description: "Consulta médica general presencial",
          isActive: true,
        },
        {
          id: "2",
          title: "Control",
          price: 35000,
          currency: "CLP",
          durationMinutes: 20,
          description: "Control de seguimiento",
          isActive: true,
        },
      ],
    },
    {
      id: "2",
      name: "Consultas Online",
      address: "Plataforma virtual",
      isVirtual: true,
      country: "Chile",
      city: "Santiago",
      neighborhood: "",
      pricings: [
        {
          id: "3",
          title: "Teleconsulta",
          price: 40000,
          currency: "CLP",
          durationMinutes: 30,
          description: "Consulta médica por videollamada",
          isActive: true,
        },
      ],
    },
  ]);

  const handleCreateClinic = (clinicData: any) => {
    const newClinic = {
      ...clinicData,
      id: Date.now().toString(),
      pricings: [],
    };
    setClinics((prev) => [...prev, newClinic]);
  };

  const handleEditClinic = (clinic: any) => {
    setEditingClinic(clinic);
    setShowClinicForm(true);
  };

  const handleUpdateClinic = (clinicData: any) => {
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === editingClinic.id ? { ...clinic, ...clinicData } : clinic
      )
    );
    setEditingClinic(null);
  };

  const handleCreatePricing = (pricingData: any) => {
    const newPricing = {
      ...pricingData,
      id: Date.now().toString(),
    };

    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === pricingData.clinicId
          ? { ...clinic, pricings: [...clinic.pricings, newPricing] }
          : clinic
      )
    );
  };

  const handleEditPricing = (pricing: any, clinicId: string) => {
    setEditingPricing({ ...pricing, clinicId });
    setShowPricingForm(true);
  };

  const handleUpdatePricing = (pricingData: any) => {
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === pricingData.clinicId
          ? {
              ...clinic,
              pricings: clinic.pricings.map((p) =>
                p.id === editingPricing.id ? { ...p, ...pricingData } : p
              ),
            }
          : clinic
      )
    );
    setEditingPricing(null);
  };

  const handleTogglePricingStatus = (pricingId: string, clinicId: string) => {
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === clinicId
          ? {
              ...clinic,
              pricings: clinic.pricings.map((p) =>
                p.id === pricingId ? { ...p, isActive: !p.isActive } : p
              ),
            }
          : clinic
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Clínicas y Precios
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona tus ubicaciones de trabajo y tarifas por servicios.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowClinicForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nueva Clínica
            </button>
            <button
              onClick={() => setShowPricingForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nuevo Precio
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Clínicas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Servicios Activos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.reduce(
                  (acc, clinic) =>
                    acc + clinic.pricings.filter((p) => p.isActive).length,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Clínicas Virtuales
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.filter((c) => c.isVirtual).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📍</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Presenciales</p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.filter((c) => !c.isVirtual).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clinics List */}
      <div className="space-y-6">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Clinic Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      clinic.isVirtual ? "bg-purple-500" : "bg-blue-500"
                    }`}
                  >
                    <span className="text-white text-lg">
                      {clinic.isVirtual ? "🌐" : "🏥"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {clinic.name}
                    </h3>
                    <p className="text-sm text-gray-600">{clinic.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      clinic.isVirtual
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {clinic.isVirtual ? "Virtual" : "Presencial"}
                  </span>
                  <button
                    onClick={() => handleEditClinic(clinic)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    ⚙️
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-900">
                  Tarifas de Servicios
                </h4>
                <button
                  onClick={() => {
                    setSelectedClinic(clinic.id);
                    setShowPricingForm(true);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Agregar Tarifa
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Servicio
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Precio
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Duración
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Estado
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinic.pricings.map((pricing) => (
                      <tr
                        key={pricing.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {pricing.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {pricing.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-lg font-semibold text-gray-900">
                            ${pricing.price.toLocaleString()} {pricing.currency}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-700">
                            {pricing.durationMinutes} min
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              pricing.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {pricing.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleEditPricing(pricing, clinic.id)
                              }
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() =>
                                handleTogglePricingStatus(pricing.id, clinic.id)
                              }
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              {pricing.isActive ? "Desactivar" : "Activar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {clinic.pricings.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">💰</div>
                  <p className="text-gray-500">
                    No hay tarifas configuradas para esta clínica
                  </p>
                  <button
                    onClick={() => {
                      setSelectedClinic(clinic.id);
                      setShowPricingForm(true);
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Agregar primera tarifa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowClinicForm(true)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white">🏥</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Agregar Clínica</p>
                <p className="text-sm text-gray-500">
                  Nueva ubicación de trabajo
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowPricingForm(true)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white">💰</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Configurar Precios</p>
                <p className="text-sm text-gray-500">
                  Definir tarifas por servicio
                </p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white">📊</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Análisis de Precios</p>
                <p className="text-sm text-gray-500">
                  Comparar con competencia
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="text-blue-600">ℹ️</div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">
              Gestión Completa de Clínicas y Precios
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Las funcionalidades de edición, creación y gestión avanzada
              estarán disponibles próximamente. Actualmente puedes ver tus
              clínicas y precios configurados.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ClinicForm
        isOpen={showClinicForm}
        onClose={() => {
          setShowClinicForm(false);
          setEditingClinic(null);
        }}
        clinic={editingClinic}
        onSubmit={editingClinic ? handleUpdateClinic : handleCreateClinic}
      />

      <PricingForm
        isOpen={showPricingForm}
        onClose={() => {
          setShowPricingForm(false);
          setEditingPricing(null);
          setSelectedClinic(undefined);
        }}
        pricing={editingPricing}
        clinics={clinics.map((c) => ({
          id: c.id,
          name: c.name,
          isVirtual: c.isVirtual,
        }))}
        selectedClinicId={selectedClinic}
        onSubmit={editingPricing ? handleUpdatePricing : handleCreatePricing}
      />
    </div>
  );
}
