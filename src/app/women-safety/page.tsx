import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import LocationPermissionClient from '@/components/LocationPermissionClient'

export default function SafetyCompanionApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2d2640] to-[#1a1625] pt-16 px-4">
      <Card className=" mt-10
      max-w-4xl mx-auto bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-2xl rounded-3xl backdrop-blur-xl">
        <div className="p-8 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Safety Companion
          </h1>
          <Suspense fallback={<p>Loading...</p>}>
            <LocationPermissionClient />
          </Suspense>
        </div>
      </Card>
    </div>
  )
}
