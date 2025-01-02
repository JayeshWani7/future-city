import { NextResponse } from 'next/server'

type EmergencyContact = {
  name: string
  phone: string
}

let emergencyContacts: EmergencyContact[] = [
  { name: 'John Doe', phone: '+1234567890' },
  { name: 'Jane Smith', phone: '+0987654321' },
]

export async function GET() {
  return NextResponse.json(emergencyContacts)
}

export async function POST(request: Request) {
  const contact: EmergencyContact = await request.json()
  emergencyContacts.push(contact)
  return NextResponse.json(emergencyContacts)
}

