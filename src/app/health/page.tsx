import { FoodAnalyzer } from "@/components/FoodAnalyzer";

export default function NearbyAmenities() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">Nearby Amenities</h1>
      <div className="rounded-lg  bg-card p-8 text-card-foreground">
        <FoodAnalyzer/>
,      </div>
    </div>
  )
}

