"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Navigation } from "lucide-react"

interface MapPlaceholderProps {
  latitude: number
  longitude: number
  markerTitle?: string
  height?: string
}

export default function MapPlaceholder({
  latitude,
  longitude,
  markerTitle = "Our Location",
  height = "400px",
}: MapPlaceholderProps) {
  const [showDirections, setShowDirections] = useState(false)

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`

  return (
    <div className="space-y-4">
      <div className="w-full rounded-lg overflow-hidden border border-border relative bg-muted/50" style={{ height }}>
        {/* Static Map Placeholder */}
        {!showDirections && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-1">{markerTitle}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Latitude: {latitude}, Longitude: {longitude}
            </p>
            <Button onClick={() => setShowDirections(true)} className="flex items-center gap-2">
              <Navigation className="h-4 w-4" /> Show Interactive Map
            </Button>
          </div>
        )}

        {/* Google Maps Embed when user clicks */}
        {showDirections && (
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

      <div className="flex justify-center">
        <Button asChild variant="outline" className="flex items-center gap-2">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Get Directions <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
