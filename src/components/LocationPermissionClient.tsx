'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RiskAnalyzer } from '@/components/RiskAnalyzer'
import { SafeRoutePlanner } from '@/components/SafeRoutePlanner'
import { AlertTriangle } from 'lucide-react'

export default function LocationPermissionClient() {
  const [activeFeature, setActiveFeature] = useState<'risk' | 'route'>('risk')
  const [location, setLocation] = useState<[number, number] | null>(null)
  const [sosNumbers, setSOSNumbers] = useState<string[]>([])
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude])
          setHasPermission(true)
        },
        (error) => {
          console.error('Error getting location:', error.message)
          alert(`Error getting location: ${error.message}`)
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }, [])

  const handleSOS = () => {
    if (location) {
      const [lat, lng] = location
      const message = encodeURIComponent(`Emergency! My location: https://www.google.com/maps?q=${lat},${lng}`)
      sosNumbers.forEach((number) => {
        window.open(`https://wa.me/${number}?text=${message}`, '_blank')
      })
    } else {
      alert('Unable to get your current location.')
    }
  }

  return hasPermission ? (
    <div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setActiveFeature('risk')}
          className={`px-6 py-3 rounded-full font-medium text-sm shadow-lg ${
            activeFeature === 'risk'
              ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
              : 'bg-[#1a1625]/60 text-purple-400 hover:bg-purple-600/20'
          }`}
        >
          Risk Analyzer
        </Button>
        <Button
          onClick={() => setActiveFeature('route')}
          className={`px-6 py-3 rounded-full font-medium text-sm shadow-lg ${
            activeFeature === 'route'
              ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
              : 'bg-[#1a1625]/60 text-purple-400 hover:bg-purple-600/20'
          }`}
        >
          Safe Route Planner
        </Button>
      </div>

      {activeFeature === 'risk' ? <RiskAnalyzer location={location} /> : <SafeRoutePlanner location={location} />}

      <Button
        onClick={handleSOS}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center mt-4"
      >
        <AlertTriangle className="mr-2" />
        SOS: Send Location via WhatsApp
      </Button>
    </div>
  ) : (
    <p>Requesting location permission...</p>
  )
}
