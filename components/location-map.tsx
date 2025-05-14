"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Extend Leaflet types to include fullscreen control
declare global {
  interface Window {
    L: any;
  }
}

declare module "leaflet" {
  namespace control {
    function fullscreen(options?: any): any;
  }
}

interface LocationMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
  height?: string;
  showControls?: boolean;
  showFullscreenControl?: boolean;
  showZoomControl?: boolean;
  showNearbyPlaces?: boolean;
}

export default function LocationMap({
  latitude,
  longitude,
  zoom = 15,
  markerTitle = "Our Location",
  height = "400px",
  showControls = true,
  showFullscreenControl = true,
  showZoomControl = true,
  showNearbyPlaces = false,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    // Dynamic import of leaflet to avoid SSR issues
    const loadMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapLoaded) {
        const L = (await import("leaflet")).default;
        await import("leaflet.fullscreen/Control.FullScreen");
        await import("leaflet.fullscreen/Control.FullScreen.css");

        // Initialize map if it doesn't exist yet
        const container = mapRef.current;

        // Create map instance
        const mapInstance = L.map(container, {
          zoomControl: showZoomControl,
        }).setView([latitude, longitude], zoom);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance);

        // Add marker
        const marker = L.marker([latitude, longitude]).addTo(mapInstance);
        marker.bindPopup(`<b>${markerTitle}</b>`).openPopup();
        // Add fullscreen control if enabled
        if (showFullscreenControl) {
          const fullscreenControl = L.control
            .fullscreen({
              position: "topleft",
              title: "Show fullscreen",
              titleCancel: "Exit fullscreen",
              forceSeparateButton: true,
            })
            .addTo(mapInstance);
        }

        // Add nearby places if enabled
        if (showNearbyPlaces) {
          // This would typically use a places API
          // For demonstration, we'll add some sample places
          const places = [
            {
              name: "University Library",
              lat: latitude + 0.001,
              lng: longitude + 0.002,
            },
            {
              name: "Main Cafeteria",
              lat: latitude - 0.001,
              lng: longitude + 0.001,
            },
            {
              name: "Administration Building",
              lat: latitude + 0.002,
              lng: longitude - 0.001,
            },
          ];

          places.forEach((place) => {
            L.marker([place.lat, place.lng])
              .addTo(mapInstance)
              .bindPopup(`<b>${place.name}</b>`);
          });
        }

        setMap(mapInstance);
        setMapLoaded(true);

        return () => {
          mapInstance.remove();
        };
      }
    };

    loadMap();
  }, [
    latitude,
    longitude,
    zoom,
    markerTitle,
    mapLoaded,
    showZoomControl,
    showFullscreenControl,
    showNearbyPlaces,
  ]);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="space-y-4">
      <div
        ref={mapRef}
        className="w-full rounded-lg overflow-hidden border border-border"
        style={{ height }}
      />
      {showControls && (
        <div className="flex justify-center">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
