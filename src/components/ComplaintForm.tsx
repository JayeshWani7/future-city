'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComplaintCategory } from '@/components/complaint'
import { submitComplaint } from '@/app/actions'

export function ComplaintForm() {
  const [category, setCategory] = useState<ComplaintCategory>('water')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitComplaint({ category, description, location })
    router.push('/thank-you')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(value: ComplaintCategory) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="water">Water Issues</SelectItem>
            <SelectItem value="security">Security Concerns</SelectItem>
            <SelectItem value="sanitation">Sanitation Problems</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue..."
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter the location of the issue"
          required
        />
      </div>
      <Button type="submit">Submit Complaint</Button>
    </form>
  )
}

