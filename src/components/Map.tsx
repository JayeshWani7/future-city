import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Shield } from 'lucide-react'

interface MapProps {
  location: [number, number] | null
  route?: [number, number][]
}

const Map = ({ location, route }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (location) {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    
      mapRef.current = L.map('map').setView(location, 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      // Clear existing layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          mapRef.current?.removeLayer(layer)
        }
      })

      // Add user location marker
      const userIcon = L.divIcon({
        html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>',
        className: 'user-location-icon'
      })
      L.marker(location, { icon: userIcon }).addTo(mapRef.current)
        .bindPopup('Your current location')
        .openPopup()

      // Add police stations
      const policeStations = generateMockPoliceStations(location, 3)
      const policeIcon = L.divIcon({
        html: `<div class="text-blue-500">${Shield}</div>`,
        className: 'police-station-icon'
      })
      policeStations.forEach((station) => {
        if (mapRef.current) {
          L.marker(station, { icon: policeIcon }).addTo(mapRef.current)
        }
      })

      // Add route if provided
      if (route) {
        L.polyline(route, { color: 'green', weight: 5 }).addTo(mapRef.current)
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [location, route])

  return (
    <div id="map" style={{ height: '100%', width: '100%' }}>
      {!location && (
        <div className="h-full w-full flex items-center justify-center bg-gray-800 text-white">
          No location provided
        </div>
      )}
    </div>
  )
}

function generateMockPoliceStations(center: [number, number], count: number): [number, number][] {
  // Mock function to generate police station coordinates
  return Array.from({ length: count }, () => [
    center[0] + (Math.random() - 0.5) * 0.1,
    center[1] + (Math.random() - 0.5) * 0.1
  ])
}

export default dynamic(() => Promise.resolve(Map), { ssr: false })