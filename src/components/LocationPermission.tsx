import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, AlertCircle } from 'lucide-react'

interface LocationPermissionProps {
  onPermissionGranted: (position: GeolocationPosition) => void
}

export function LocationPermission({ onPermissionGranted }: LocationPermissionProps) {
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null)

  useEffect(() => {
    checkPermission()
  }, [])

  const checkPermission = async () => {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      setPermissionState(permission.state)
      permission.onchange = () => setPermissionState(permission.state)
    }
  }

  const requestPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionState('granted')
        onPermissionGranted(position)
      },
      (error) => {
        console.error('Error getting location:', error.message)
        setPermissionState('denied')
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }

  if (permissionState === 'granted') {
    return null
  }

  return (
    <Card className="p-6 bg-gray-800 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Location Access Required</h2>
      {permissionState === 'denied' ? (
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <p className="mb-4">
            Location access is denied. Please enable location services for this website in your browser settings to use the Safety Companion app.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-blue-500" />
          <p className="mb-4">
            The Safety Companion app needs access to your location to provide accurate safety information and emergency services.
          </p>
          <Button onClick={requestPermission} className="bg-blue-600 hover:bg-blue-700">
            Grant Location Access
          </Button>
        </div>
      )}
    </Card>
  )
}

