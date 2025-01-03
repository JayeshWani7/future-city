'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./map-component'), { ssr: false })

interface RouteData {
  distance: number
  duration: number
}

interface TransportMode {
  id: string
  name: string
  icon: string
  co2Factor: number
}

export function CarbonCalculator() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [selectedMode, setSelectedMode] = useState<string>('car')
  const [coordinates, setCoordinates] = useState<[number, number][] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const transportModes: TransportMode[] = [
    { id: 'cycle', name: 'Cycle', icon: '🚲', co2Factor: 0 },
    { id: 'ebike', name: 'E-bike', icon: '⚡', co2Factor: 0.015 },
    { id: 'evcar', name: 'EV Car', icon: '🚗', co2Factor: 0.053 },
    { id: 'car', name: 'Car', icon: '🚘', co2Factor: 0.192 }
  ]

  const calculateCarbonFootprint = (distance: number, mode: string) => {
    const transportMode = transportModes.find(m => m.id === mode)
    return +(distance * (transportMode?.co2Factor || 0)).toFixed(2)
  }

  const getCoordinates = async (location: string) => {
    try {
      const response = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf624860affffdbfd144d6b344e9019411109b&text=${encodeURIComponent(location)}`
      )
      if (!response.ok) throw new Error('Geocoding failed')
      const data = await response.json()
      
      if (!data.features || data.features.length === 0) {
        throw new Error(`Location not found: ${location}`)
      }
      
      return data.features[0].geometry.coordinates
    } catch (error) {
      console.error('Geocoding error:', error)
      throw error
    }
  }

  const calculateRoute = async () => {
    setIsLoading(true)
    try {
      const [sourceLng, sourceLat] = await getCoordinates(source)
      const [destLng, destLat] = await getCoordinates(destination)

      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624860affffdbfd144d6b344e9019411109b&start=${sourceLng},${sourceLat}&end=${destLng},${destLat}`
      )

      if (!response.ok) {
        throw new Error('Route calculation failed')
      }

      const data = await response.json()

      if (!data.features || data.features.length === 0) {
        throw new Error('No route found')
      }

      const coords = data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])
      const distance = data.features[0].properties.segments[0].distance / 1000 // Convert to km
      const duration = data.features[0].properties.segments[0].duration / 60 // Convert to minutes

      setCoordinates(coords)
      setRouteData({ distance, duration })
    } catch (error) {
      console.error('Error calculating route:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to calculate route')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2d2640] to-[#1a1625] pt-16 px-4">
      <Card className="max-w-3xl mx-auto bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-2xl rounded-3xl backdrop-blur-xl">
        <div className="p-8 space-y-8">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Carbon Footprint Calculator
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Input
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="bg-[#1a1625]/60 border-purple-500/30 text-white pl-12 h-14 rounded-2xl hover:border-purple-400/50 focus:border-purple-400/70 transition-colors"
                disabled={isLoading}
              />
              <MapPin className="absolute left-4 top-4 text-purple-400 h-6 w-6" />
            </div>
            <div className="relative">
              <Input
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#1a1625]/60 border-purple-500/30 text-white pl-12 h-14 rounded-2xl hover:border-purple-400/50 focus:border-purple-400/70 transition-colors"
                disabled={isLoading}
              />
              <MapPin className="absolute left-4 top-4 text-purple-400 h-6 w-6" />
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white h-14 rounded-2xl text-lg font-medium shadow-lg shadow-purple-500/20 transition-all duration-300"
            onClick={calculateRoute}
            disabled={isLoading || !source || !destination}
          >
            {isLoading ? 'Calculating...' : 'Calculate Route'}
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transportModes.map((mode) => (
              <Button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`h-14 rounded-2xl transition-all duration-300 ${
                  selectedMode === mode.id
                    ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-[#1a1625]/60 text-purple-400 hover:bg-purple-600/20 border border-purple-500/30'
                }`}
                disabled={isLoading}
              >
                <span className="text-xl mr-2">{mode.icon}</span>
                <span className="font-medium">{mode.name}</span>
              </Button>
            ))}
          </div>

          {routeData && (
            <div className="space-y-4 bg-[#1a1625]/40 p-6 rounded-2xl backdrop-blur-sm border border-purple-500/20">
              <p className="text-purple-300 text-lg">
                Distance: <span className="font-semibold text-white">{routeData.distance.toFixed(2)} km</span>
              </p>
              <p className="text-purple-300 text-lg">
                Estimated Carbon Footprint:{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold text-xl">
                  {calculateCarbonFootprint(routeData.distance, selectedMode)} kg CO₂
                </span>
              </p>
            </div>
          )}

          {coordinates && (
            <div className="h-[400px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl shadow-purple-500/10 backdrop-blur-sm">
              <MapComponent coordinates={coordinates} />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
