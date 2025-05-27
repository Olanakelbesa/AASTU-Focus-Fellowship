"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin } from "lucide-react"

interface AboutPageMapProps {
  latitude: number
  longitude: number
  markerTitle?: string
  height?: string
}

export default function AboutPageMap({
  latitude,
  longitude,
  markerTitle = "Our Location",
  height = "400px",
}: AboutPageMapProps) {

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=8.887550587108628,38.809970887108214&destination=8.891263711200805,38.799113629416546`
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`

  return (
    <div className="space-y-4">
      <div className="w-full rounded-lg overflow-hidden border border-border relative bg-muted/50" style={{ height }}>
        {/* Google Maps Embed when user clicks */}
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
