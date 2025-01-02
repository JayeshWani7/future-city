import { useState, useEffect } from 'react'

interface RiskAnalyzerProps {
  location: [number, number] | null
}

export function RiskAnalyzer({ location }: RiskAnalyzerProps) {
  const [riskLevel, setRiskLevel] = useState<number | null>(null)
  const [nearbyPoliceStations, setNearbyPoliceStations] = useState<number>(0)

  useEffect(() => {
    if (location) {
      // Simulate risk analysis based on mock crime data
      const mockCrimeData = generateMockHeatmapData(location, 100)
      const riskScore = calculateRiskScore(location, mockCrimeData)
      setRiskLevel(riskScore)

      // Simulate nearby police stations
      setNearbyPoliceStations(Math.floor(Math.random() * 3) + 1)
    } else {
      setRiskLevel(null)
      setNearbyPoliceStations(0)
    }
  }, [location])

  if (!location) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-purple-300">Risk Analysis</h2>
        <p className="text-gray-300">Waiting for location data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-300">Risk Analysis</h2>
      <p className="text-gray-300">
        Current Location: {location[0].toFixed(6)}, {location[1].toFixed(6)}
      </p>
      {riskLevel !== null && (
        <>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                riskLevel < 33 ? 'bg-green-500' : riskLevel < 66 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${riskLevel}%` }}
            ></div>
          </div>
          <p className="text-gray-300">
            Risk Level: {riskLevel.toFixed(2)}% - {riskLevel < 33 ? 'Low' : riskLevel < 66 ? 'Medium' : 'High'} Risk
          </p>
          <p className="text-gray-300">
            Nearby Police Stations: {nearbyPoliceStations}
          </p>
        </>
      )}
    </div>
  )
}

function generateMockHeatmapData(center: [number, number], count: number): [number, number, number][] {
  const [lat, lng] = center
  return Array.from({ length: count }, () => [
    lat + (Math.random() - 0.5) * 0.1,
    lng + (Math.random() - 0.5) * 0.1,
    Math.random()
  ])
}

function calculateRiskScore(location: [number, number], crimeData: [number, number, number][]): number {
  const [lat, lng] = location
  const nearbyIncidents = crimeData.filter(([crimeLat, crimeLng, intensity]) => {
    const distance = Math.sqrt(Math.pow(lat - crimeLat, 2) + Math.pow(lng - crimeLng, 2))
    return distance < 0.01 && intensity > 0.5 // Approximately 1km and high intensity
  })
  
  const riskScore = (nearbyIncidents.length / crimeData.length) * 100
  return Math.min(riskScore * 5, 100) // Amplify the risk for demonstration purposes
}

