'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { IPAddressDisplay } from '@/components/IPAddressDisplay'
import { RiskAnalyzer } from '@/components/RiskAnalyzer'
import { SafeRoutePlanner } from '@/components/SafeRoutePlanner'
import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

interface MainContentProps {
  location: [number, number] | null
  sosNumbers: string[]
}

export const MainContent = ({ location, sosNumbers }: MainContentProps) => {
  const [activeFeature, setActiveFeature] = useState<'risk' | 'route'>('risk')

  const handleSOS = () => {
    if (location) {
      const [lat, lng] = location
      const message = encodeURIComponent(`Emergency! My current location: https://www.google.com/maps?q=${lat},${lng}`)
      if (sosNumbers.length > 0) {
        sosNumbers.forEach(number => {
          window.open(`https://wa.me/${number}?text=${message}`, '_blank')
        })
      } else {
        window.open(`https://wa.me/?text=${message}`, '_blank')
      }
    } else {
      alert('Unable to get your current location. Please ensure location services are enabled and try again.')
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Safety Companion
      </h1>

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

      {activeFeature === 'risk' ? (
        <>
          <IPAddressDisplay />
          <RiskAnalyzer location={location} />
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapWithNoSSR location={location} />
          </div>
          <Button
            onClick={handleSOS}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="mr-2" />
            SOS: Send Location via WhatsApp
          </Button>
        </>
      ) : (
        <SafeRoutePlanner location={location} />
      )}
    </div>
  )
}
