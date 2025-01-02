import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json()
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Analyze the following food ingredients: ${ingredients}. 
    Provide a brief nutritional score out of 10, list key nutrients, potential health benefits, and any concerns. 
    Then suggest 2-3 healthier alternatives if applicable. Format the response in markdown.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ analysis: text })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Failed to analyze ingredients' }, { status: 500 })
  }
}

