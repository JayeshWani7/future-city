'use client'

import React, { useState, useRef, useCallback } from 'react'
import { toast } from 'sonner'
import Webcam from 'react-webcam'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Upload, Camera } from 'lucide-react'
import { NutritionScoreChart } from './NutritionScoreChart'

export function FoodAnalyzer() {
  const [ingredients, setIngredients] = useState('')
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [nutritionScore, setNutritionScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const webcamRef = useRef<Webcam>(null)

  const analyzeIngredients = useCallback(async () => {
    setIsLoading(true)
    setAnalysis(null)
    setNutritionScore(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze ingredients')
      }

      const data = await response.json()
      setAnalysis(data.analysis)
      
      // Extract nutrition score from the analysis
      const scoreMatch = data.analysis.match(/Nutritional score: (\d+)\/10/)
      if (scoreMatch && scoreMatch[1]) {
        setNutritionScore(parseInt(scoreMatch[1], 10))
      }
    } catch (error) {
      console.error('Error analyzing ingredients:', error)
      toast.error('Failed to analyze ingredients. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [ingredients])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        if (typeof text === 'string') {
          setIngredients(text)
        }
      }
      reader.readAsText(file)
    }
  }, [])

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      // Here you would typically send this image to an OCR service
      // For now, we'll just set a placeholder text
      setIngredients('Ingredients from image: [OCR result would go here]')
      setShowCamera(false)
    }
  }, [])

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-[#1a1625] via-[#2d2640] to-[#1a1625] pt-16 px-4">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-2xl rounded-3xl backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Food Ingredient Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <Textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter food ingredients (e.g., wheat flour, sugar, vegetable oil)"
            className="w-full p-4 border border-purple-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/70 bg-[#1a1625]/60 text-white placeholder-white/50 transition-all duration-300 min-h-[100px]"
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={analyzeIngredients}
              disabled={!ingredients || isLoading}
              className={`px-6 py-3 rounded-full font-medium text-sm shadow-lg ${
                isLoading
                  ? "bg-opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Ingredients'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt"
            />
            <Button
              variant="outline"
              onClick={() => setShowCamera(!showCamera)}
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="mr-2 h-4 w-4" />
              {showCamera ? 'Hide Camera' : 'Show Camera'}
            </Button>
          </div>
          {showCamera && (
            <Card className="overflow-hidden rounded-2xl bg-[#1a1625]/60 border border-purple-500/30">
              <CardContent className="p-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg shadow-lg"
                />
                <Button
                  onClick={captureImage}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full"
                >
                  Capture Image
                </Button>
              </CardContent>
            </Card>
          )}
          {nutritionScore !== null && (
            <Card className="overflow-hidden rounded-2xl bg-[#1a1625]/60 border border-purple-500/30">
              <CardContent className="p-6">
                <NutritionScoreChart score={nutritionScore} />
              </CardContent>
            </Card>
          )}
          {analysis && (
            <Card className="overflow-hidden rounded-2xl bg-[#1a1625]/60 border border-purple-500/30">
              <CardContent className="p-6">
                <ReactMarkdown className="prose prose-invert max-w-none">
                  {analysis}
                </ReactMarkdown>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

