"use client";

import React, { useState, useCallback, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

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
  opinions: Array<any>; // For review count
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  initialCenter?: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

// Mock coordinates for Bolivian cities
const getMockCoordinates = (address: string | null) => {
  const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
    "Santa Cruz": { lat: -17.8146, lng: -63.1561 },
    "La Paz": { lat: -16.5, lng: -68.15 },
    Cochabamba: { lat: -17.3895, lng: -66.1568 },
    Oruro: { lat: -17.9833, lng: -67.15 },
    Potosí: { lat: -19.5836, lng: -65.7531 },
    Tarija: { lat: -21.5355, lng: -64.7296 },
    Sucre: { lat: -19.0333, lng: -65.2627 },
  };

  if (!address) {
    return { lat: -17.8146, lng: -63.1561 };
  }

  for (const [city, coords] of Object.entries(cityCoordinates)) {
    if (address.toLowerCase().includes(city.toLowerCase())) {
      return {
        ...coords,
        lat: coords.lat + (Math.random() - 0.5) * 0.02,
        lng: coords.lng + (Math.random() - 0.5) * 0.02,
      };
    }
  }

  return { lat: -17.8146, lng: -63.1561 };
};

export default function MapModal({
  isOpen,
  onClose,
  doctors,
  initialCenter,
}: MapModalProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    doctor: Doctor;
    clinic: Clinic;
  } | null>(null);
  const [visibleDoctors, setVisibleDoctors] = useState<Doctor[]>(doctors);
  const [mapCenter] = useState(
    initialCenter || { lat: -17.8146, lng: -63.1561 }
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Update visible doctors based on map bounds
  const updateVisibleDoctors = useCallback(() => {
    if (!map) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    const doctorsInBounds = doctors.filter((doctor) =>
      doctor.clinics.some((doctorClinic) => {
        const coords = getMockCoordinates(
          doctorClinic.clinic.address || doctorClinic.clinic.city
        );
        return bounds.contains(new google.maps.LatLng(coords.lat, coords.lng));
      })
    );

    setVisibleDoctors(doctorsInBounds);
  }, [map, doctors]);

  // Set up bounds change listener
  useEffect(() => {
    if (map) {
      const listener = map.addListener("bounds_changed", updateVisibleDoctors);
      updateVisibleDoctors(); // Initial call

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map, updateVisibleDoctors]);

  if (!isOpen) return null;

  if (loadError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Error del Mapa</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-red-600">
            Error al cargar el mapa. Por favor, intenta nuevamente.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-center">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Doctor List Sidebar */}
        <div className="w-80 bg-gray-50 h-full overflow-y-auto shadow-lg">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Doctores en el Área
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {visibleDoctors.length} doctores encontrados
            </p>
          </div>

          <div className="p-4 space-y-4">
            {visibleDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer border"
              >
                <h3 className="font-semibold text-gray-900">
                  {doctor.name} {doctor.surname}
                </h3>
                <p className="text-sm text-gray-600">
                  {doctor.specialities[0]?.speciality?.name || "Especialista"}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      4.5 ({doctor.opinions.length} reseñas)
                    </span>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  {doctor.clinics.map((doctorClinic) => (
                    <div
                      key={doctorClinic.clinic.id}
                      className="flex items-start text-xs text-gray-500"
                    >
                      <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      <span>
                        {doctorClinic.clinic.address ||
                          doctorClinic.clinic.city ||
                          "Dirección no disponible"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {visibleDoctors.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay doctores en esta área.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Mueve el mapa para explorar otras zonas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {doctors.map((doctor) =>
              doctor.clinics.map((doctorClinic) => {
                const coordinates = getMockCoordinates(
                  doctorClinic.clinic.address || doctorClinic.clinic.city
                );
                return (
                  <Marker
                    key={`${doctor.id}-${doctorClinic.clinic.id}`}
                    position={coordinates}
                    onClick={() =>
                      setSelectedDoctor({ doctor, clinic: doctorClinic.clinic })
                    }
                    icon={{
                      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                  />
                );
              })
            )}

            {selectedDoctor && (
              <InfoWindow
                position={getMockCoordinates(
                  selectedDoctor.clinic.address || selectedDoctor.clinic.city
                )}
                onCloseClick={() => setSelectedDoctor(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {selectedDoctor.doctor.name} {selectedDoctor.doctor.surname}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedDoctor.doctor.specialities[0]?.speciality?.name ||
                      "Especialista"}
                  </p>
                  <div className="text-sm text-gray-700 mb-2">
                    <p className="font-medium">{selectedDoctor.clinic.name}</p>
                    <p>
                      {selectedDoctor.clinic.address ||
                        selectedDoctor.clinic.city ||
                        "Dirección no disponible"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      4.5 ({selectedDoctor.doctor.opinions.length} reseñas)
                    </span>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
