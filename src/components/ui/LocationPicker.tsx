"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin, Loader2 } from "lucide-react";

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address?: string;
    country?: string;
    city?: string;
    neighborhood?: string;
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
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.attraction",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.government",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// Helper function to extract address components from Google geocoding results
const extractAddressComponents = (result: google.maps.GeocoderResult) => {
  const components = result.address_components;
  let country = "";
  let city = "";
  let neighborhood = "";

  components.forEach((component) => {
    const types = component.types;

    // Country
    if (types.includes("country")) {
      country = component.long_name;
    }

    // City - can be locality, administrative_area_level_2, or sublocality
    if (types.includes("locality")) {
      city = component.long_name;
    } else if (types.includes("administrative_area_level_2") && !city) {
      city = component.long_name;
    }

    // Neighborhood/Comuna - can be sublocality, neighborhood, or administrative_area_level_3
    if (
      types.includes("sublocality") ||
      types.includes("sublocality_level_1")
    ) {
      neighborhood = component.long_name;
    } else if (types.includes("neighborhood")) {
      neighborhood = component.long_name;
    } else if (types.includes("administrative_area_level_3") && !neighborhood) {
      neighborhood = component.long_name;
    }
  });

  return { country, city, neighborhood };
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
    if (address && address.trim() && isLoaded && !selectedLocation) {
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

          const addressComponents = extractAddressComponents(results[0]);

          setSelectedLocation(location);
          onLocationSelect({
            ...location,
            address: results[0].formatted_address,
            ...addressComponents,
          });

          // Center map on the geocoded location
          if (map) {
            map.setCenter(location);
            map.setZoom(15);
          }
        } else {
          console.warn("Geocoding failed:", status);
        }
      });
    }
  }, [address, isLoaded, selectedLocation, map, onLocationSelect]);

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
          if (status === "OK" && results && results[0]) {
            const addressComponents = extractAddressComponents(results[0]);

            onLocationSelect({
              ...location,
              address: results[0].formatted_address,
              ...addressComponents,
            });
          } else {
            // If reverse geocoding fails, just send coordinates
            onLocationSelect({
              ...location,
            });
          }
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

      {!selectedLocation && address && !isGeocodingAddress && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-900">
                📍 Ubicación pendiente
              </p>
              <p className="text-yellow-700">
                Haz clic en el mapa para confirmar la ubicación exacta o ajusta
                la dirección para búsqueda automática
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
