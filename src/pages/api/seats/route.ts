import { NextResponse } from 'next/server'

let seats = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  isReserved: false,
  reservedBy: null,
}))

export async function GET() {
  return NextResponse.json({ seats })
}

export async function POST(request: Request) {
  const { action, seatIds, username } = await request.json()

  if (action === 'reserve') {
    seats = seats.map(seat =>
      seatIds.includes(seat.id) ? { ...seat, isReserved: true, reservedBy: username } : seat
    )
  } else if (action === 'cancel') {
    seats = seats.map(seat =>
      seatIds.includes(seat.id) ? { ...seat, isReserved: false, reservedBy: null } : seat
    )
  }

  return NextResponse.json({ success: true, seats })
}

