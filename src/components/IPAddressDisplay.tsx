'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function IPAddressDisplay() {
  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchIPAddress = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      setIpAddress(data.ip)
    } catch (err) {
      setError('Failed to fetch IP address. Please try again.')
      console.error('Error fetching IP:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPAddress()
  }, [])

  return (
    <Card className="p-4 bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Your IP Address</h3>
      {loading ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : error ? (
        <div>
          <p className="text-red-400">{error}</p>
          <Button onClick={fetchIPAddress} className="mt-2 bg-blue-600 hover:bg-blue-700">
            Retry
          </Button>
        </div>
      ) : (
        <p className="font-mono">{ipAddress || 'Not available'}</p>
      )}
    </Card>
  )
}

