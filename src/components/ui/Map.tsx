"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { Maximize2 } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
};

// Default center (La Paz, Bolivia)
const defaultCenter = {
  lat: -16.5,
  lng: -68.1193,
};

// Map options with custom styling to match the design
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};

interface Clinic {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  specialities: Array<{
    speciality: {
      name: string;
    };
  }>;
  clinics: Array<{
    clinic: Clinic;
  }>;
}

interface MapProps {
  doctors?: Doctor[];
  className?: string;
  onOpenModal?: () => void;
}

// Mock coordinates for demonstration (in real app, you'd get these from a geocoding service)
const getMockCoordinates = (city: string | null) => {
  const locations: { [key: string]: { lat: number; lng: number } } = {
    "La Paz": { lat: -16.5, lng: -68.1193 },
    "Santa Cruz": { lat: -17.7834, lng: -63.1821 },
    Cochabamba: { lat: -17.3935, lng: -66.157 },
    Sucre: { lat: -19.0332, lng: -65.2627 },
    Potosí: { lat: -19.5836, lng: -65.7531 },
    Oruro: { lat: -17.9647, lng: -67.1093 },
    Tarija: { lat: -21.5355, lng: -64.7296 },
    Trinidad: { lat: -14.8333, lng: -64.9 },
    Cobija: { lat: -11.0267, lng: -68.7692 },
  };

  if (city && locations[city]) {
    // Add some random offset for different clinics in the same city
    const baseLocation = locations[city];
    return {
      lat: baseLocation.lat + (Math.random() - 0.5) * 0.02,
      lng: baseLocation.lng + (Math.random() - 0.5) * 0.02,
    };
  }

  // Default to La Paz with random offset
  return {
    lat: defaultCenter.lat + (Math.random() - 0.5) * 0.02,
    lng: defaultCenter.lng + (Math.random() - 0.5) * 0.02,
  };
};

const getMarkerIcon = (type: string) => {
  const color =
    type === "clinic"
      ? "%233B82F6"
      : type === "office"
      ? "%2310B981"
      : "%238B5CF6";
  return {
    url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${color}'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E`,
    scaledSize:
      typeof window !== "undefined"
        ? new window.google.maps.Size(32, 32)
        : undefined,
  };
};

export default function Map({
  doctors = [],
  className,
  onOpenModal,
}: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState<
    Array<{
      id: string;
      position: { lat: number; lng: number };
      clinic: Clinic;
      doctor: Doctor;
      type: string;
    }>
  >([]);

  // Process doctors and create markers
  useEffect(() => {
    const newMarkers: Array<{
      id: string;
      position: { lat: number; lng: number };
      clinic: Clinic;
      doctor: Doctor;
      type: string;
    }> = [];

    doctors.forEach((doctor) => {
      doctor.clinics.forEach((doctorClinic, index) => {
        const clinic = doctorClinic.clinic;
        const coordinates = getMockCoordinates(clinic.city);

        // Determine clinic type based on name or other criteria
        let type = "clinic";
        if (clinic.name?.toLowerCase().includes("consultorio")) {
          type = "office";
        } else if (clinic.name?.toLowerCase().includes("online")) {
          type = "online";
        }

        newMarkers.push({
          id: `${doctor.id}-${clinic.id}-${index}`,
          position: coordinates,
          clinic,
          doctor,
          type,
        });
      });
    });

    setMarkers(newMarkers);

    // Adjust map center if we have markers
    if (newMarkers.length > 0) {
      const avgLat =
        newMarkers.reduce((sum, marker) => sum + marker.position.lat, 0) /
        newMarkers.length;
      const avgLng =
        newMarkers.reduce((sum, marker) => sum + marker.position.lng, 0) /
        newMarkers.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [doctors]);

  const onLoad = useCallback(() => {
    // Map instance loaded
  }, []);

  const onUnmount = useCallback(() => {
    // Map unmounted
  }, []);

  const handleActiveMarker = (markerId: string) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  // Fallback if Google Maps API key is not set
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 ${className}`}
      >
        <div className="text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <h4 className="font-semibold text-gray-700 mb-2">Mapa Interactivo</h4>
          <p className="text-sm text-gray-600 mb-4">
            Aquí se mostrará la ubicación de las clínicas y consultorios
          </p>
          <div className="text-xs text-gray-500">
            Configurar Google Maps API Key
          </div>
        </div>
      </div>
    );
  }

  return isLoaded ? (
    <div
      className={`w-full h-full rounded-lg overflow-hidden relative ${className}`}
    >
      {/* Open Modal Button */}
      {onOpenModal && (
        <button
          onClick={onOpenModal}
          className="absolute top-3 right-3 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-md transition-colors"
          title="Abrir mapa completo"
        >
          <Maximize2 className="h-4 w-4 text-gray-600" />
        </button>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={markers.length > 0 ? 12 : 11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={getMarkerIcon(marker.type)}
            onClick={() => handleActiveMarker(marker.id)}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={
              markers.find((m) => m.id === activeMarker)?.position ||
              defaultCenter
            }
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2 max-w-xs">
              {(() => {
                const marker = markers.find((m) => m.id === activeMarker);
                if (!marker) return null;

                return (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Dr. {marker.doctor.name} {marker.doctor.surname}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">
                      {marker.doctor.specialities[0]?.speciality?.name ||
                        "Especialista"}
                    </p>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{marker.clinic.name}</p>
                      <p>{marker.clinic.city}</p>
                      {marker.clinic.address && (
                        <p className="text-xs">{marker.clinic.address}</p>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() =>
                          window.open(`/doctor/${marker.doctor.id}`, "_blank")
                        }
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div
      className={`w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">🗺️</div>
        <h4 className="font-semibold text-gray-700 mb-2">Cargando Mapa...</h4>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
