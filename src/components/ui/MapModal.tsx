"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
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
  latitude: number | null;
  longitude: number | null;
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  picaddress?: string | null;
  consultationPrice?: number | null;
  specialities: Array<{
    speciality: {
      name: string;
    };
  }>;
  clinics: Array<{
    clinic: Clinic;
  }>;
  opinions: Array<{
    id: string;
    rating: number;
    title?: string | null;
    description?: string | null;
  }>;
  pricings: Array<{
    id: string;
    amount: number;
    clinic: {
      id: string;
      name: string;
    };
  }>;
  experiences?: Array<{
    id: string;
    title: string;
    institution?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
  }>;
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

// Helper function to calculate average rating from real opinions
const calculateAverageRating = (opinions: Doctor["opinions"]): number => {
  if (!opinions || opinions.length === 0) return 0;
  const sum = opinions.reduce((acc, opinion) => acc + opinion.rating, 0);
  return Math.round((sum / opinions.length) * 10) / 10; // Round to 1 decimal place
};

// Helper function to get years of experience
const calculateYearsOfExperience = (
  experiences?: Doctor["experiences"]
): number => {
  if (!experiences || experiences.length === 0) return 0;

  const currentDate = new Date();
  let totalYears = 0;

  experiences.forEach((exp) => {
    if (exp.startDate) {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : currentDate;
      const years =
        (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      totalYears += Math.max(0, years);
    }
  });

  return Math.floor(totalYears);
};

// Helper function to get price range for a doctor
const getPriceRange = (doctor: Doctor): string => {
  if (doctor.pricings && doctor.pricings.length > 0) {
    const prices = doctor.pricings.map((p) => p.amount);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (minPrice === maxPrice) {
      return `Bs. ${minPrice.toLocaleString()}`;
    }
    return `Bs. ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;
  }

  if (doctor.consultationPrice) {
    return `Bs. ${doctor.consultationPrice.toLocaleString()}`;
  }

  return "Precio a consultar";
};

// Helper function to get all specialities formatted
const getSpecialitiesText = (specialities: Doctor["specialities"]): string => {
  if (!specialities || specialities.length === 0) return "Especialista";

  if (specialities.length === 1) {
    return specialities[0].speciality.name;
  }

  if (specialities.length === 2) {
    return `${specialities[0].speciality.name} y ${specialities[1].speciality.name}`;
  }

  return `${specialities[0].speciality.name} y ${specialities.length - 1} más`;
};

// Get coordinates from clinic data (latitude/longitude from database)
const getClinicCoordinates = (
  clinic: Clinic,
  cityCoordinatesMap?: { [key: string]: { lat: number; lng: number } }
) => {
  // If clinic has saved coordinates, use them
  if (clinic.latitude && clinic.longitude) {
    return {
      lat: clinic.latitude,
      lng: clinic.longitude,
    };
  }

  // Use real city coordinates from database if available
  if (clinic.city && cityCoordinatesMap && cityCoordinatesMap[clinic.city]) {
    const baseLocation = cityCoordinatesMap[clinic.city];
    // Add some random offset for different clinics in the same city
    return {
      lat: baseLocation.lat + (Math.random() - 0.5) * 0.02,
      lng: baseLocation.lng + (Math.random() - 0.5) * 0.02,
    };
  }

  // Try to match by city name in address as fallback
  if (clinic.city && cityCoordinatesMap) {
    for (const [city, coords] of Object.entries(cityCoordinatesMap)) {
      if (clinic.city.toLowerCase().includes(city.toLowerCase())) {
        return {
          ...coords,
          lat: coords.lat + (Math.random() - 0.5) * 0.02,
          lng: coords.lng + (Math.random() - 0.5) * 0.02,
        };
      }
    }
  }

  // Try to match by address as final fallback
  if (clinic.address && cityCoordinatesMap) {
    for (const [city, coords] of Object.entries(cityCoordinatesMap)) {
      if (clinic.address.toLowerCase().includes(city.toLowerCase())) {
        return {
          ...coords,
          lat: coords.lat + (Math.random() - 0.5) * 0.02,
          lng: coords.lng + (Math.random() - 0.5) * 0.02,
        };
      }
    }
  }

  // Default to Bolivia center if no location data available
  return { lat: -16.5, lng: -68.1193 };
};

// Helper function to build city coordinates from database clinics
const buildCityCoordinatesMap = (
  doctors: Doctor[]
): { [key: string]: { lat: number; lng: number } } => {
  const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {};

  doctors.forEach((doctor) => {
    doctor.clinics.forEach((doctorClinic) => {
      const clinic = doctorClinic.clinic;
      // If clinic has coordinates and city, use it as reference for that city
      if (
        clinic.latitude &&
        clinic.longitude &&
        clinic.city &&
        !cityCoordinates[clinic.city]
      ) {
        cityCoordinates[clinic.city] = {
          lat: clinic.latitude,
          lng: clinic.longitude,
        };
      }
    });
  });

  return cityCoordinates;
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

  // Build city coordinates map from database clinics
  const cityCoordinatesMap = useMemo(
    () => buildCityCoordinatesMap(doctors),
    [doctors]
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
        const coords = getClinicCoordinates(
          doctorClinic.clinic,
          cityCoordinatesMap
        );
        return bounds.contains(new google.maps.LatLng(coords.lat, coords.lng));
      })
    );

    setVisibleDoctors(doctorsInBounds);
  }, [map, doctors, cityCoordinatesMap]);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
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
            {visibleDoctors.map((doctor) => {
              const avgRating = calculateAverageRating(doctor.opinions);
              const yearsExp = calculateYearsOfExperience(doctor.experiences);
              const priceRange = getPriceRange(doctor);
              const specialitiesText = getSpecialitiesText(doctor.specialities);

              return (
                <div
                  key={doctor.id}
                  className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer border shadow-sm"
                >
                  {/* Doctor Header */}
                  <div className="flex items-start gap-3 mb-3">
                    {doctor.picaddress ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                        <Image
                          src={doctor.picaddress}
                          alt={`Dr. ${doctor.name} ${doctor.surname}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {doctor.name.charAt(0)}
                          {doctor.surname.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        Dr. {doctor.name} {doctor.surname}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        {specialitiesText}
                      </p>
                      {yearsExp > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {yearsExp} {yearsExp === 1 ? "año" : "años"} de
                          experiencia
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {avgRating > 0 ? (
                        <>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= avgRating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {avgRating} ({doctor.opinions.length}{" "}
                            {doctor.opinions.length === 1
                              ? "reseña"
                              : "reseñas"}
                            )
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Sin reseñas aún
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {priceRange}
                    </span>
                  </div>

                  {/* Clinic Locations */}
                  <div className="space-y-1">
                    {doctor.clinics.slice(0, 2).map((doctorClinic) => (
                      <div
                        key={doctorClinic.clinic.id}
                        className="flex items-start text-xs text-gray-500"
                      >
                        <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span>
                          <span className="font-medium text-gray-700">
                            {doctorClinic.clinic.name}
                          </span>
                          {(doctorClinic.clinic.address ||
                            doctorClinic.clinic.city) && (
                            <>
                              {" - "}
                              {doctorClinic.clinic.address ||
                                doctorClinic.clinic.city}
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                    {doctor.clinics.length > 2 && (
                      <p className="text-xs text-blue-600 ml-4">
                        +{doctor.clinics.length - 2} ubicaciones más
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

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
                const coordinates = getClinicCoordinates(
                  doctorClinic.clinic,
                  cityCoordinatesMap
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
                position={getClinicCoordinates(
                  selectedDoctor.clinic,
                  cityCoordinatesMap
                )}
                onCloseClick={() => setSelectedDoctor(null)}
              >
                <div className="p-3 max-w-xs">
                  <div className="flex items-start gap-3 mb-2">
                    {selectedDoctor.doctor.picaddress ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src={selectedDoctor.doctor.picaddress}
                          alt={`Dr. ${selectedDoctor.doctor.name}`}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {selectedDoctor.doctor.name.charAt(0)}
                          {selectedDoctor.doctor.surname.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        Dr. {selectedDoctor.doctor.name}{" "}
                        {selectedDoctor.doctor.surname}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium">
                        {getSpecialitiesText(
                          selectedDoctor.doctor.specialities
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mb-2">
                    <p className="font-medium text-gray-900">
                      {selectedDoctor.clinic.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedDoctor.clinic.address ||
                        selectedDoctor.clinic.city ||
                        "Dirección no disponible"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {(() => {
                        const avgRating = calculateAverageRating(
                          selectedDoctor.doctor.opinions
                        );
                        return avgRating > 0 ? (
                          <>
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="ml-1 text-xs text-gray-600">
                              {avgRating} (
                              {selectedDoctor.doctor.opinions.length})
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-gray-500">
                            Sin reseñas
                          </span>
                        );
                      })()}
                    </div>
                    <span className="text-xs font-semibold text-green-600">
                      {getPriceRange(selectedDoctor.doctor)}
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
