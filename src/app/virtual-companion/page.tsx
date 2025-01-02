'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Mic, VolumeIcon as VolumeUp } from 'lucide-react'
import Link from 'next/link'

type Message = {
  text: string
  sender: 'user' | 'ai'
}

export default function VirtualCompanion() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `AI response to: ${input}`, sender: 'ai' }])
      }, 1000)
    }
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setInput('Voice input simulated')
    }, 2000)
  }

  const speakMessage = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center mb-4 text-blue-400 hover:text-blue-300">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Virtual Companion</h1>
      <div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {message.text}
            </span>
            {message.sender === 'ai' && (
              <button onClick={() => speakMessage(message.text)} className="ml-2 text-gray-400 hover:text-gray-300">
                <VolumeUp size={16} />
              </button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button onClick={handleVoiceInput} className="bg-gray-600 hover:bg-gray-500 px-4 py-2">
          {isListening ? <Mic className="text-red-500" /> : <Mic />}
        </button>
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4 py-2">
          <Send />
        </button>
      </div>
    </div>
  )
}

