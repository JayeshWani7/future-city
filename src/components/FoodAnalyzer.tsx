"use client";

import React, { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import Webcam from "react-webcam";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function FoodAnalyzer() {
  const [ingredients, setIngredients] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
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
    <div className="max-w-4xl mx-auto p-8 bg-[#1a0b2e] text-white rounded-2xl shadow-lg">
      <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
        Food Ingredient Analyzer
      </h1>
      <Card className="mb-8 bg-opacity-5 border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
        <CardContent className="p-6">
          <Textarea
            className="w-full p-4 border  border-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-transparent text-white placeholder-white placeholder-opacity-50"
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter food ingredients (e.g., wheat flour, sugar, vegetable oil)"
          />
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          className={`px-6 py-3 rounded-full font-medium text-sm shadow-md ${
            isLoading
              ? "bg-opacity-50 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300"
          }`}
          onClick={analyzeIngredients}
          disabled={!ingredients || isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze Ingredients"}
        </Button>
        <Button
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm font-medium rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
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
          className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-sm font-medium rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
          onClick={() => setShowCamera(!showCamera)}
        >
          {showCamera ? "Hide Camera" : "Show Camera"}
        </Button>
      </div>
      {showCamera && (
        <Card className="mb-8 bg-opacity-5 bg-white border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
          <CardContent className="p-6">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg shadow-md"
            />
            <Button
              className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-sm font-medium rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
              onClick={captureImage}
            >
              Capture Image
            </Button>
          </CardContent>
        </Card>
      )}
      {analysis && (
        <Card className="mt-8 bg-opacity-5 bg-white border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
          <CardContent className="p-6">
            <ReactMarkdown className="text-white prose prose-invert max-w-none">
              {analysis}
            </ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
