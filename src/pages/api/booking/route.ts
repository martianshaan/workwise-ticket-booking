import { NextResponse } from "next/server"

// This would typically connect to a database
const seats = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  isBooked: false,
}))

export async function GET() {
  return NextResponse.json({ seats })
}

export async function POST(request: Request) {
  const { numberOfSeats } = await request.json()

  // Validate input
  if (numberOfSeats < 1 || numberOfSeats > 7) {
    return NextResponse.json(
      { error: "Invalid number of seats requested" },
      { status: 400 }
    )
  }

  // Count available seats
  const availableSeats = seats.filter((seat) => !seat.isBooked).length

  if (numberOfSeats > availableSeats) {
    return NextResponse.json(
      { error: "Not enough seats available" },
      { status: 400 }
    )
  }

  // Book seats logic here
  // ... (similar to the client-side logic)

  return NextResponse.json({ success: true, seats })
}

