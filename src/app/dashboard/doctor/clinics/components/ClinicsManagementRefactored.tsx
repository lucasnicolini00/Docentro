"use client";

import { useState, useTransition } from "react";
import { togglePricingStatus } from "@/lib/actions/clinics";
import {
  ClinicsHeader,
  ClinicsStats,
  ClinicsList,
  LoadingOverlay,
  FormsContainer,
  type Clinic,
  type Pricing,
  type ClinicsManagementProps,
  createClinicWrapper,
  updateClinicWrapper,
  createPricingWrapper,
  updatePricingWrapper,
} from "./clinic-management";

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

  // State management
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

  // Clinic management handlers
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
    setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
  };

  // Pricing management handlers
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

  const handleAddPricing = (clinicId: string) => {
    setSelectedClinic(clinicId);
    setShowPricingForm(true);
  };

  const handleCloseClinicForm = () => {
    setShowClinicForm(false);
    setEditingClinic(null);
  };

  const handleClosePricingForm = () => {
    setShowPricingForm(false);
    setEditingPricing(null);
    setSelectedClinic(undefined);
  };

  return (
    <div className="space-y-6">
      <ClinicsHeader
        onAddClinic={() => setShowClinicForm(true)}
        isPending={isPending}
      />

      <ClinicsStats clinics={clinics} />

      <ClinicsList
        clinics={clinics}
        expandedClinics={expandedClinics}
        onToggleExpanded={toggleClinicExpanded}
        onAddClinic={() => setShowClinicForm(true)}
        onEditClinic={handleEditClinic}
        onDeleteClinic={handleDeleteClinic}
        onAddPricing={handleAddPricing}
        onEditPricing={handleEditPricing}
        onDeletePricing={handleDeletePricing}
        onTogglePricingStatus={handleTogglePricingStatus}
        isPending={isPending}
      />

      <LoadingOverlay isPending={isPending} />

      <FormsContainer
        showClinicForm={showClinicForm}
        editingClinic={editingClinic}
        onCloseClinicForm={handleCloseClinicForm}
        onSubmitClinic={editingClinic ? handleUpdateClinic : handleCreateClinic}
        showPricingForm={showPricingForm}
        editingPricing={editingPricing}
        clinics={clinics}
        onClosePricingForm={handleClosePricingForm}
        onSubmitPricing={
          editingPricing ? handleUpdatePricing : handleCreatePricing
        }
      />
    </div>
  );
}
