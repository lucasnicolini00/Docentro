"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin, Loader2 } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address?: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
  address?: string;
  className?: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

// Default center (Santa Cruz, Bolivia)
const defaultCenter = {
  lat: -17.8146,
  lng: -63.1561,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export default function LocationPicker({
  onLocationSelect,
  initialLocation,
  address,
  className = "",
}: LocationPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation || null);
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Geocode address when it changes
  useEffect(() => {
    if (address && address.trim() && isLoaded && !initialLocation) {
      setIsGeocodingAddress(true);

      const geocoder = new google.maps.Geocoder();
      const searchQuery = `${address}, Bolivia`; // Add Bolivia to improve accuracy

      geocoder.geocode({ address: searchQuery }, (results, status) => {
        setIsGeocodingAddress(false);

        if (status === "OK" && results && results[0]) {
          const location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };

          setSelectedLocation(location);
          onLocationSelect({
            ...location,
            address: results[0].formatted_address,
          });

          // Center map on the geocoded location
          if (map) {
            map.setCenter(location);
            map.setZoom(15);
          }
        }
      });
    }
  }, [address, isLoaded, initialLocation, map, onLocationSelect]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        setSelectedLocation(location);

        // Reverse geocode to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          const address =
            status === "OK" && results && results[0]
              ? results[0].formatted_address
              : undefined;

          onLocationSelect({
            ...location,
            address,
          });
        });
      }
    },
    [onLocationSelect]
  );

  if (loadError) {
    return (
      <div
        className={`w-full h-[400px] bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center ${className}`}
      >
        <div className="text-center text-gray-500">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Error al cargar el mapa</p>
          <p className="text-xs">Verifica la configuración de Google Maps</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className={`w-full h-[400px] bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center ${className}`}
      >
        <div className="text-center text-gray-500">
          <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
          <p className="text-sm">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className={`w-full h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 border border-gray-200 rounded-lg flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <h4 className="font-semibold text-gray-700 mb-2">
            Selector de Ubicación
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Haz clic en el mapa para seleccionar la ubicación
          </p>
          <p className="text-xs text-gray-500">
            Configurar Google Maps API Key para activar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Ubicación en el Mapa
          </label>
          {isGeocodingAddress && (
            <div className="flex items-center text-xs text-blue-600">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Buscando ubicación...
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Haz clic en el mapa para seleccionar la ubicación exacta de la clínica
        </p>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation || defaultCenter}
          zoom={selectedLocation ? 15 : 11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={mapOptions}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23dc2626'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
                scaledSize: new google.maps.Size(32, 32),
              }}
              title="Ubicación de la clínica"
            />
          )}
        </GoogleMap>
      </div>

      {selectedLocation && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-green-900">
                Ubicación seleccionada
              </p>
              <p className="text-green-700">
                Latitud: {selectedLocation.lat.toFixed(6)}, Longitud:{" "}
                {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
