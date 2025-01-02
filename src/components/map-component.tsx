'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  coordinates: [number, number][]
}

export default function MapComponent({ coordinates }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true
      }).setView(coordinates[0], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current)
    }

    // Clear existing layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add route polyline
    const polyline = L.polyline(coordinates, { 
      color: '#a855f7',
      weight: 4,
      opacity: 0.8
    }).addTo(mapRef.current)

    // Add markers for start and end points
    const startIcon = L.divIcon({
      className: 'bg-purple-500 w-4 h-4 rounded-full border-2 border-white',
      iconSize: [16, 16]
    })

    const endIcon = L.divIcon({
      className: 'bg-purple-700 w-4 h-4 rounded-full border-2 border-white',
      iconSize: [16, 16]
    })

    L.marker(coordinates[0], { icon: startIcon }).addTo(mapRef.current)
    L.marker(coordinates[coordinates.length - 1], { icon: endIcon }).addTo(mapRef.current)

    // Fit bounds to show the entire route
    mapRef.current.fitBounds(polyline.getBounds())

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [coordinates])

  return <div id="map" className="h-full w-full" />
}

