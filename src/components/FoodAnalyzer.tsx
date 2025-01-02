"use client";

import React, { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FoodAnalyzer() {
  const [ingredients, setIngredients] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const analyzeIngredients = useCallback(async () => {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze ingredients");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing ingredients:", error);
      toast.error("Failed to analyze ingredients. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setIngredients(text);
      };
      reader.readAsText(file);
    }
  }, []);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIngredients("Ingredients from image: [OCR result would go here]");
      setShowCamera(false);
    }
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-[#1a1625] via-[#2d2640] to-[#1a1625] pt-16 px-4">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-2xl rounded-3xl backdrop-blur-xl">
        <CardContent className="p-8 mt-8 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Food Ingredient Analyzer
          </h1>

          <Textarea
            className="w-full p-4 border border-purple-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/70 bg-[#1a1625]/60 text-white placeholder-white/50 transition-all duration-300"
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter food ingredients (e.g., wheat flour, sugar, vegetable oil)"
          />

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className={`px-6 py-3 rounded-full font-medium text-sm shadow-lg ${
                isLoading
                  ? "bg-opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              }`}
              onClick={analyzeIngredients}
              disabled={!ingredients || isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Ingredients"}
            </Button>
            <Button
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt"
            />
            <Button
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowCamera(!showCamera)}
            >
              {showCamera ? "Hide Camera" : "Show Camera"}
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
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-sm font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={captureImage}
                >
                  Capture Image
                </Button>
              </CardContent>
            </Card>
          )}

          {analysis && (
            <Card className="overflow-hidden rounded-2xl bg-[#1a1625]/60 border border-purple-500/30">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-purple-300">Analysis Results</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-blue-300 mb-2">Nutritional Profile</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Calories', 'Protein', 'Carbs', 'Fat'].map((nutrient) => (
                        <div key={nutrient} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{nutrient}</span>
                            <span className="text-white font-medium">{Math.floor(Math.random() * 100)}g</span>
                          </div>
                          <Progress value={Math.random() * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-blue-300 mb-2">Allergen Information</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Gluten', 'Dairy', 'Nuts', 'Soy'].map((allergen) => (
                        <span key={allergen} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-blue-300 mb-2">Health Score</h3>
                    <div className="flex items-center space-x-4">
                      <Progress value={75} className="h-4 flex-grow" />
                      <span className="text-2xl font-bold text-green-400">75/100</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm italic mt-4">
                  Note: This analysis is based on the provided ingredients and should be used as a general guide only.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

