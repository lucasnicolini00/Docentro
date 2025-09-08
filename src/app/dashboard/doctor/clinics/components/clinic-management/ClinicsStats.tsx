import { Building2, DollarSign, Globe } from "lucide-react";
import { Clinic } from "./types";

interface ClinicsStatsProps {
  clinics: Clinic[];
}

export default function ClinicsStats({ clinics }: ClinicsStatsProps) {
  const totalClinics = clinics.length;
  const activePricings = clinics.reduce(
    (sum, clinic) => sum + clinic.pricings.filter((p) => p.isActive).length,
    0
  );
  const virtualClinics = clinics.filter((clinic) => clinic.isVirtual).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Clínicas</p>
            <p className="text-2xl font-bold text-gray-900">{totalClinics}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Tarifas Activas</p>
            <p className="text-2xl font-bold text-gray-900">{activePricings}</p>
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
            <p className="text-2xl font-bold text-gray-900">{virtualClinics}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
