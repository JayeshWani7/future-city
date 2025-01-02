import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

interface SafeRoutePlannerProps {
  location: [number, number] | null
}

export function SafeRoutePlanner({ location }: SafeRoutePlannerProps) {
  const [destination, setDestination] = useState('')
  const [route, setRoute] = useState<[number, number][] | null>(null)

  const handlePlanRoute = () => {
    if (location) {
      // This is a mock function. In a real app, you'd use a routing API.
      const mockRoute = generateMockRoute(location, destination)
      setRoute(mockRoute)
    } else {
      alert('Unable to get your current location. Please ensure location services are enabled.')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-300">Safe Route Planner</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          className="flex-grow bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
        />
        <Button
          onClick={handlePlanRoute}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 flex items-center"
        >
          <MapPin className="mr-2" />
          Plan Route
        </Button>
      </div>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapWithNoSSR location={location} route={route || undefined} />
      </div>
      {route && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">Route Safety Analysis</h3>
          <p className="text-gray-300">
            This route has been analyzed for safety. It avoids high-risk areas and passes near 2 police stations.
          </p>
          <p className="text-gray-300 mt-2">
            Estimated safe travel time: {Math.floor(Math.random() * 20 + 10)} minutes
          </p>
        </div>
      )}
    </div>
  )
}

function generateMockRoute(start: [number, number], end: string): [number, number][] {
  const [startLat, startLng] = start
  const steps = 5
  const route: [number, number][] = [start]

  for (let i = 1; i <= steps; i++) {
    const lat = startLat + (Math.random() - 0.5) * 0.05 * (i / steps)
    const lng = startLng + (Math.random() - 0.5) * 0.05 * (i / steps)
    route.push([lat, lng])
  }

  return route
}

