import { useState, useRef, useEffect } from 'react'
import { Send, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Message = {
  text: string
  sender: 'user' | 'ai'
}

export function VirtualCompanion() {
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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-300">Virtual Companion</h2>
      <div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {message.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <Button onClick={handleVoiceInput} className="bg-gray-600 hover:bg-gray-500 rounded-full">
          {isListening ? <Mic className="text-red-500" /> : <Mic />}
        </Button>
        <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          <Send />
        </Button>
      </div>
    </div>
  )
}

