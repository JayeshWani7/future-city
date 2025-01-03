import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface NutritionScoreChartProps {
  score: number
}

export function NutritionScoreChart({ score }: NutritionScoreChartProps) {
  const getColor = (score: number) => {
    if (score <= 3) return 'from-red-500 to-red-600'
    if (score <= 6) return 'from-yellow-500 to-yellow-600'
    return 'from-green-500 to-green-600'
  }

  return (
    <Card className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-white">
          Nutrition Score
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-white text-black">
                  Score
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-white">
                  {score * 10}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-white/30">
              <div
                style={{ width: `${score * 10}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gradient-to-r ${getColor(score)}`}
              ></div>
            </div>
          </div>
          <div className="text-center font-bold text-4xl text-white">
            {score}/10
          </div>
          <div className="text-center text-white text-sm">
            {score <= 3 && "Poor nutritional value. Consider healthier alternatives."}
            {score > 3 && score <= 6 && "Moderate nutritional value. Room for improvement."}
            {score > 6 && "Good nutritional value. Keep up the healthy choices!"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
