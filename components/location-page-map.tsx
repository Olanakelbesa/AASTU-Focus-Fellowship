"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ZoomIn } from "lucide-react"

interface LocationPageMapProps {
  latitude: number
  longitude: number
  markerTitle?: string
  height?: string
}

export default function LocationPageMap({
  latitude,
  longitude,
  markerTitle = "Our Location",
  height = "500px",
}: LocationPageMapProps) {
  const [showMap, setShowMap] = useState(false)
  const [mapMode, setMapMode] = useState<"roadmap" | "satellite">("roadmap")

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=16&maptype=${mapMode}`

  return (
    <div className="space-y-4">
      <div className="w-full rounded-lg overflow-hidden border border-border relative bg-muted/50" style={{ height }}>
        {/* Static Map Placeholder */}
        {!showMap && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-1">{markerTitle}</h3>
            <p className="text-muted-foreground text-sm mb-2">Addis Ababa Science and Technology University</p>
            <p className="text-muted-foreground text-sm mb-4">
              Latitude: {latitude}, Longitude: {longitude}
            </p>
            <Button onClick={() => setShowMap(true)} className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4" /> View Interactive Map
            </Button>
          </div>
        )}

        {/* Google Maps Embed when user clicks */}
        {showMap && (
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        )}
      </div>

      {showMap && (
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={mapMode === "roadmap" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapMode("roadmap")}
          >
            Road Map
          </Button>
          <Button
            variant={mapMode === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapMode("satellite")}
          >
            Satellite View
          </Button>
        </div>
      )}

      <div className="flex justify-center">
        <Button asChild className="flex items-center gap-2">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </Button>
      </div>
    </div>
  )
}
