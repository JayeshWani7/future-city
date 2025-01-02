import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, X } from 'lucide-react'

interface SOSNumberInputProps {
  onSubmit: (numbers: string[]) => void
}

export function SOSNumberInput({ onSubmit }: SOSNumberInputProps) {
  const [numbers, setNumbers] = useState<string[]>([''])

  const handleAddNumber = () => {
    setNumbers([...numbers, ''])
  }

  const handleRemoveNumber = (index: number) => {
    const newNumbers = numbers.filter((_, i) => i !== index)
    setNumbers(newNumbers.length ? newNumbers : [''])
  }

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers]
    newNumbers[index] = value
    setNumbers(newNumbers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validNumbers = numbers.filter(n => n.trim() !== '')
    onSubmit(validNumbers)
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-[#2d2640]/90 via-[#1a1625]/95 to-[#2d2640]/90 border-none shadow-2xl rounded-3xl backdrop-blur-xl p-8">
      <h2 className="text-2xl font-bold text-center text-purple-300 mb-6">Add SOS Contact Numbers</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {numbers.map((number, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              type="tel"
              value={number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              placeholder="Enter phone number"
              className="flex-grow bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
            />
            <Button
              type="button"
              onClick={() => handleRemoveNumber(index)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
            >
              <X size={20} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddNumber}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add Another Number
        </Button>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-2"
        >
          Save and Continue
        </Button>
      </form>
    </Card>
  )
}

