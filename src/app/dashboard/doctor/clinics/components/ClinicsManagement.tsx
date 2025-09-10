"use client";

import { useState, useTransition } from "react";
import { togglePricingStatus } from "@/lib/actions/clinics";
import {
  ClinicsHeader,
  ClinicsStats,
  ClinicsList,
  LoadingOverlay,
  FormsContainer,
  ConfirmationModal,
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
  // State management
  const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
  const [showClinicForm, setShowClinicForm] = useState(false);
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | undefined>();
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [editingPricing, setEditingPricing] = useState<Pricing | null>(null);
  const [expandedClinics, setExpandedClinics] = useState<Set<string>>(
    new Set()
  );

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "clinic" | "pricing";
    id: string;
    clinicId?: string;
    title: string;
    message: string;
  } | null>(null);
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

  const handleCreateClinic = async (data: any) => {
    startTransition(async () => {
      const result = await createClinicWrapper(data);
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

  const handleUpdateClinic = async (data: any) => {
    if (!editingClinic) return;

    startTransition(async () => {
      const result = await updateClinicWrapper(editingClinic.id, data);
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
    const clinic = clinics.find((c) => c.id === clinicId);
    setConfirmAction({
      type: "clinic",
      id: clinicId,
      title: "Eliminar Clínica",
      message: `¿Estás seguro de que quieres eliminar la clínica "${clinic?.name}"? Esta acción no se puede deshacer.`,
    });
    setShowConfirmModal(true);
  };

  // Pricing management handlers
  const handleCreatePricing = async (data: any) => {
    startTransition(async () => {
      const result = await createPricingWrapper(data);
      if (result.success && result.data) {
        const clinicId = data.clinicId as string;
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === clinicId
              ? { ...clinic, pricings: [...clinic.pricings, result.data] }
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

  const handleUpdatePricing = async (data: any) => {
    if (!editingPricing || !selectedClinic) return;

    startTransition(async () => {
      const result = await updatePricingWrapper(editingPricing.id, data);
      if (result.success && result.data) {
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === selectedClinic
              ? {
                  ...clinic,
                  pricings: clinic.pricings.map((p) =>
                    p.id === editingPricing.id ? result.data : p
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
    const clinic = clinics.find((c) => c.id === clinicId);
    const pricing = clinic?.pricings.find((p) => p.id === pricingId);
    setConfirmAction({
      type: "pricing",
      id: pricingId,
      clinicId,
      title: "Eliminar Precio",
      message: `¿Estás seguro de que quieres eliminar el precio "${pricing?.title}"? Esta acción no se puede deshacer.`,
    });
    setShowConfirmModal(true);
  };

  const handleTogglePricingStatus = async (
    pricingId: string,
    clinicId: string
  ) => {
    startTransition(async () => {
      const result = await togglePricingStatus(pricingId);
      if (result.success && result.data) {
        setClinics((prev) =>
          prev.map((clinic) =>
            clinic.id === clinicId
              ? {
                  ...clinic,
                  pricings: clinic.pricings.map((p) =>
                    p.id === pricingId ? result.data : p
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

  const handleConfirmDelete = () => {
    if (!confirmAction) return;

    if (confirmAction.type === "clinic") {
      setClinics((prev) =>
        prev.filter((clinic) => clinic.id !== confirmAction.id)
      );
    } else if (confirmAction.type === "pricing" && confirmAction.clinicId) {
      setClinics((prev) =>
        prev.map((clinic) =>
          clinic.id === confirmAction.clinicId
            ? {
                ...clinic,
                pricings: clinic.pricings.filter(
                  (p) => p.id !== confirmAction.id
                ),
              }
            : clinic
        )
      );
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
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
        selectedClinicId={selectedClinic}
        onClosePricingForm={handleClosePricingForm}
        onSubmitPricing={
          editingPricing ? handleUpdatePricing : handleCreatePricing
        }
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        title={confirmAction?.title || ""}
        message={confirmAction?.message || ""}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
}
