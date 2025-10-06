"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { togglePricingStatus } from "@/lib/actions/clinics";
import { ConfirmationModal } from "@/components/ui";
import {
  ClinicsHeader,
  ClinicsStats,
  ClinicsList,
  FormsContainer,
  type Clinic,
  type Pricing,
  type ClinicsManagementProps,
  createClinicWrapper,
  updateClinicWrapper,
  createPricingWrapper,
  updatePricingWrapper,
  deletePricingWrapper,
  deleteClinicWrapper,
} from ".";

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
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await createClinicWrapper(data);
          if (result.success && result.data) {
            setClinics((prev) => [...prev, { ...result.data, pricings: [] }]);
            resolve();
          } else {
            reject(new Error(result.error || "Error al crear la clínica"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const handleEditClinic = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setShowClinicForm(true);
  };

  const handleUpdateClinic = async (data: any) => {
    if (!editingClinic) return;

    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
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
            resolve();
          } else {
            reject(new Error(result.error || "Error al actualizar la clínica"));
          }
        } catch (error) {
          reject(error);
        }
      });
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
        toast.success("Tarifa creada exitosamente");
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
        toast.success("Tarifa actualizada exitosamente");
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

  const handleConfirmDelete = async () => {
    if (!confirmAction) return;

    startTransition(async () => {
      if (confirmAction.type === "clinic") {
        // Call the API to delete the clinic
        const result = await deleteClinicWrapper(confirmAction.id);

        if (result.success) {
          // Update the frontend state after successful deletion
          setClinics((prev) =>
            prev.filter((clinic) => clinic.id !== confirmAction.id)
          );
          toast.success("Clínica eliminada exitosamente");
        } else {
          // Handle error and show toast notification
          toast.error(result.error || "Error al eliminar la clínica");
          console.error("Error deleting clinic:", result.error);
        }
      } else if (confirmAction.type === "pricing" && confirmAction.clinicId) {
        // Call the API to delete the pricing
        const result = await deletePricingWrapper(confirmAction.id);

        if (result.success) {
          // Update the frontend state after successful deletion
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
          toast.success("Precio eliminado exitosamente");
        } else {
          // Handle error and show toast notification
          toast.error(result.error || "Error al eliminar el precio");
          console.error("Error deleting pricing:", result.error);
        }
      }

      // Close the confirmation modal
      setShowConfirmModal(false);
      setConfirmAction(null);
    });
  };

  const handleCloseConfirmModal = () => {
    if (!isPending) {
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
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
