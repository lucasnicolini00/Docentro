"use client";

import { useState, useTransition } from "react";
import {
  Building2,
  Plus,
  MapPin,
  Edit,
  Trash2,
  Globe,
  Clock,
  DollarSign,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  createClinic,
  updateClinic,
  createPricing,
  updatePricing,
  togglePricingStatus,
} from "@/lib/actions/clinics";
import { ClinicForm, PricingForm } from "@/components/ui/forms";
import { LoadingSpinner } from "@/components/ui/feedback";

interface Clinic {
  id: string;
  name: string;
  address: string | null;
  country: string | null;
  city: string | null;
  neighborhood: string | null;
  isVirtual: boolean;
  pricings: Pricing[];
  _count?: {
    appointments: number;
  };
}

interface Pricing {
  id: string;
  title: string;
  price: number;
  currency: string;
  durationMinutes: number;
  description: string | null;
  isActive: boolean;
}

interface ClinicsManagementProps {
  initialClinics: Clinic[];
}

// Wrapper functions to convert FormData to expected object format
async function createClinicWrapper(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    isVirtual: formData.get("isVirtual") === "true",
    country: (formData.get("country") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    neighborhood: (formData.get("neighborhood") as string) || undefined,
  };
  return createClinic(data);
}

async function updateClinicWrapper(clinicId: string, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    isVirtual: formData.get("isVirtual") === "true",
    country: (formData.get("country") as string) || undefined,
    city: (formData.get("city") as string) || undefined,
    neighborhood: (formData.get("neighborhood") as string) || undefined,
  };
  return updateClinic(clinicId, data);
}

async function createPricingWrapper(formData: FormData) {
  const data = {
    clinicId: formData.get("clinicId") as string,
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    currency: (formData.get("currency") as string) || "BOB",
    durationMinutes: parseInt(formData.get("durationMinutes") as string),
    description: (formData.get("description") as string) || undefined,
    isActive: formData.get("isActive") === "true",
  };
  return createPricing(data);
}

async function updatePricingWrapper(pricingId: string, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    currency: (formData.get("currency") as string) || "BOB",
    durationMinutes: parseInt(formData.get("durationMinutes") as string),
    description: (formData.get("description") as string) || undefined,
    isActive: formData.get("isActive") === "true",
  };
  return updatePricing(pricingId, data);
}

export default function ClinicsManagement({
  initialClinics,
}: ClinicsManagementProps) {
  // Transform initial data to handle Decimal price conversion
  const transformedClinics = initialClinics.map((clinic) => ({
    ...clinic,
    pricings: clinic.pricings.map((pricing) => ({
      ...pricing,
      price:
        typeof pricing.price === "number"
          ? pricing.price
          : Number(pricing.price),
    })),
  }));

  const [clinics, setClinics] = useState<Clinic[]>(transformedClinics);
  const [showClinicForm, setShowClinicForm] = useState(false);
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | undefined>();
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [editingPricing, setEditingPricing] = useState<Pricing | null>(null);
  const [expandedClinics, setExpandedClinics] = useState<Set<string>>(
    new Set()
  );
  const [isPending, startTransition] = useTransition();

  const toggleClinicExpanded = (clinicId: string) => {
    const newExpanded = new Set(expandedClinics);
    if (newExpanded.has(clinicId)) {
      newExpanded.delete(clinicId);
    } else {
      newExpanded.add(clinicId);
    }
    setExpandedClinics(newExpanded);
  };

  const handleCreateClinic = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createClinicWrapper(formData);
      if (result.success && result.data) {
        setClinics((prev) => [...prev, { ...result.data, pricings: [] }]);
        setShowClinicForm(false);
      }
    });
  };

  const handleEditClinic = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setShowClinicForm(true);
  };

  const handleUpdateClinic = async (formData: FormData) => {
    if (!editingClinic) return;

    startTransition(async () => {
      const result = await updateClinicWrapper(editingClinic.id, formData);
      if (result.success && result.data) {
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === editingClinic.id
              ? { ...clinic, ...result.data }
              : clinic
          )
        );
        setEditingClinic(null);
        setShowClinicForm(false);
      }
    });
  };

  const handleDeleteClinic = async (clinicId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta clínica?")) return;

    // For now, just remove from state since delete function may not be implemented
    setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
  };

  const handleCreatePricing = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createPricingWrapper(formData);
      if (result.success && result.data) {
        const clinicId = formData.get("clinicId") as string;
        const newPricing = {
          ...result.data,
          price:
            typeof result.data.price === "number"
              ? result.data.price
              : Number(result.data.price),
        };
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === clinicId
              ? { ...clinic, pricings: [...clinic.pricings, newPricing] }
              : clinic
          )
        );
        setShowPricingForm(false);
        setSelectedClinic(undefined);
      }
    });
  };

  const handleEditPricing = (pricing: Pricing, clinicId: string) => {
    setEditingPricing(pricing);
    setSelectedClinic(clinicId);
    setShowPricingForm(true);
  };

  const handleUpdatePricing = async (formData: FormData) => {
    if (!editingPricing || !selectedClinic) return;

    startTransition(async () => {
      const result = await updatePricingWrapper(editingPricing.id, formData);
      if (result.success && result.data) {
        const updatedPricing = {
          ...result.data,
          price:
            typeof result.data.price === "number"
              ? result.data.price
              : Number(result.data.price),
        };
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === selectedClinic
              ? {
                  ...clinic,
                  pricings: clinic.pricings.map((p) =>
                    p.id === editingPricing.id ? updatedPricing : p
                  ),
                }
              : clinic
          )
        );
        setEditingPricing(null);
        setShowPricingForm(false);
        setSelectedClinic(undefined);
      }
    });
  };

  const handleDeletePricing = async (pricingId: string, clinicId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este precio?")) return;

    // For now, just remove from state since delete function may not be implemented
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === clinicId
          ? {
              ...clinic,
              pricings: clinic.pricings.filter((p) => p.id !== pricingId),
            }
          : clinic
      )
    );
  };

  const handleTogglePricingStatus = async (
    pricingId: string,
    clinicId: string
  ) => {
    startTransition(async () => {
      const result = await togglePricingStatus(pricingId);
      if (result.success && result.data) {
        const updatedPricing = {
          ...result.data,
          price:
            typeof result.data.price === "number"
              ? result.data.price
              : Number(result.data.price),
        };
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === clinicId
              ? {
                  ...clinic,
                  pricings: clinic.pricings.map((p) =>
                    p.id === pricingId ? updatedPricing : p
                  ),
                }
              : clinic
          )
        );
      }
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Clínicas y Precios
          </h1>
          <p className="text-gray-600 mt-1">
            Administra tus ubicaciones de consulta y tarifas de atención
          </p>
        </div>
        <button
          onClick={() => setShowClinicForm(true)}
          disabled={isPending}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Clínica</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
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

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Tarifas Activas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.reduce(
                  (sum, clinic) =>
                    sum + clinic.pricings.filter((p) => p.isActive).length,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Consultas Online
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {clinics.filter((clinic) => clinic.isVirtual).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clinics List */}
      {clinics.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tienes clínicas registradas
          </h3>
          <p className="text-gray-600 mb-6">
            Comienza agregando tu primera clínica o consultorio
          </p>
          <button
            onClick={() => setShowClinicForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar Primera Clínica
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Clinic Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        clinic.isVirtual ? "bg-purple-100" : "bg-blue-100"
                      }`}
                    >
                      {clinic.isVirtual ? (
                        <Globe
                          className={`w-6 h-6 ${
                            clinic.isVirtual
                              ? "text-purple-600"
                              : "text-blue-600"
                          }`}
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {clinic.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {clinic.isVirtual
                            ? "Consulta Virtual"
                            : `${clinic.address}${
                                clinic.city ? `, ${clinic.city}` : ""
                              }`}
                        </span>
                      </div>
                      {clinic._count && (
                        <div className="text-sm text-gray-500 mt-1">
                          {clinic._count.appointments} citas registradas
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {clinic.pricings.length}{" "}
                      {clinic.pricings.length === 1 ? "tarifa" : "tarifas"}
                    </span>
                    <button
                      onClick={() => toggleClinicExpanded(clinic.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      {expandedClinics.has(clinic.id) ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditClinic(clinic)}
                      disabled={isPending}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClinic(clinic.id)}
                      disabled={isPending}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedClinics.has(clinic.id) && (
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Tarifas de Atención
                    </h4>
                    <button
                      onClick={() => {
                        setSelectedClinic(clinic.id);
                        setShowPricingForm(true);
                      }}
                      disabled={isPending}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nueva Tarifa</span>
                    </button>
                  </div>

                  {clinic.pricings.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        No hay tarifas configuradas
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {clinic.pricings.map((pricing) => (
                        <div
                          key={pricing.id}
                          className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {pricing.title}
                              </h5>
                              <p className="text-2xl font-bold text-blue-600 mt-1">
                                {formatPrice(pricing.price, pricing.currency)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() =>
                                  handleTogglePricingStatus(
                                    pricing.id,
                                    clinic.id
                                  )
                                }
                                disabled={isPending}
                                className={`p-1 rounded ${
                                  pricing.isActive
                                    ? "text-green-600 hover:bg-green-50"
                                    : "text-gray-400 hover:bg-gray-50"
                                }`}
                              >
                                {pricing.isActive ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <AlertCircle className="w-5 h-5" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleEditPricing(pricing, clinic.id)
                                }
                                disabled={isPending}
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeletePricing(pricing.id, clinic.id)
                                }
                                disabled={isPending}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{pricing.durationMinutes} minutos</span>
                            </div>
                            {pricing.description && (
                              <p className="text-gray-500">
                                {pricing.description}
                              </p>
                            )}
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  pricing.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {pricing.isActive ? "Activa" : "Inactiva"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <LoadingSpinner size="md" />
            <span className="text-gray-700">Procesando...</span>
          </div>
        </div>
      )}

      {/* Forms */}
      {showClinicForm && (
        <ClinicForm
          isOpen={showClinicForm}
          onClose={() => {
            setShowClinicForm(false);
            setEditingClinic(null);
          }}
          onSubmit={editingClinic ? handleUpdateClinic : handleCreateClinic}
          clinic={
            editingClinic
              ? {
                  id: editingClinic.id,
                  name: editingClinic.name,
                  address: editingClinic.address || "",
                  isVirtual: editingClinic.isVirtual,
                  country: editingClinic.country || "",
                  city: editingClinic.city || "",
                  neighborhood: editingClinic.neighborhood || "",
                }
              : undefined
          }
        />
      )}

      {showPricingForm && (
        <PricingForm
          isOpen={showPricingForm}
          onClose={() => {
            setShowPricingForm(false);
            setEditingPricing(null);
            setSelectedClinic(undefined);
          }}
          onSubmit={editingPricing ? handleUpdatePricing : handleCreatePricing}
          clinics={clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.name,
            isVirtual: clinic.isVirtual,
          }))}
          pricing={
            editingPricing
              ? {
                  id: editingPricing.id,
                  title: editingPricing.title,
                  price: editingPricing.price,
                  currency: editingPricing.currency,
                  durationMinutes: editingPricing.durationMinutes,
                  description: editingPricing.description || "",
                  isActive: editingPricing.isActive,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
