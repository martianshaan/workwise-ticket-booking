import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSeats } from "@/pages/context/SeatContext"
import { useUser } from "@clerk/nextjs"

interface Seat {
  id: number
  isReserved: boolean
  reservedBy: string | null
}

export function SeatBooking() {
  const { seats, reserveSeats, cancelReservation } = useSeats()
  const {user}= useUser()
  const [numberOfSeats, setNumberOfSeats] = useState("")

  const bookSeats = async () => {
    const numSeats = parseInt(numberOfSeats)
    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      alert("Please enter a valid number of seats (1-7)")
      return
    }

    try {
      // Filter available seats
      const availableSeats = seats.filter(seat => !seat.isReserved)
      
      if (availableSeats.length < numSeats) {
        alert("Not enough seats available")
        return
      }

      // Try to find consecutive seats in the same row
      const rows = Array.from({ length: Math.ceil(seats.length / 7) }, (_, i) =>
        seats.slice(i * 7, (i + 1) * 7)
      )

      let selectedSeats:Seat[]= []
      
      // First try to find consecutive seats in a single row
      for (const row of rows) {
        const availableInRow = row.filter(seat => !seat.isReserved)
        if (availableInRow.length >= numSeats) {
          selectedSeats = availableInRow.slice(0, numSeats)
          break
        }
      }

      // If no consecutive seats found, just take the first available seats
      if (selectedSeats.length === 0) {
        selectedSeats = availableSeats.slice(0, numSeats)
      }

      const seatIds = selectedSeats.map(seat => seat.id)
      
      if (user) {
        if (user.firstName) {
          reserveSeats(seatIds, user.firstName)
        } else {
          alert("User first name is not available")
        }
        setNumberOfSeats("")
      }

    } catch (error) {
      console.error("Error booking seats:", error)
      alert("Error booking seats")
    }
  }

  const resetBooking = async () => {
    try {
      const reservedSeatIds = seats
        .filter(seat => seat.isReserved)
        .map(seat => seat.id)
      
      if (reservedSeatIds.length > 0) {
        await cancelReservation(reservedSeatIds)
      }
      alert("All bookings reset successfully")
    } catch (error) {
      console.error("Error resetting bookings:", error)
      alert("Error resetting bookings")
    }
    setNumberOfSeats("")
  }

  const reservedSeats = seats.filter((seat) => seat.isReserved).length
  const availableSeats = seats.length - reservedSeats

  return (
    <div className="flex flex-col lg:flex-row gap-40">
      <div className="w-full lg:w-72 space-y-4 min-w-[400px]">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Book Seats</h2>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="7"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
              placeholder="Enter number of seats"
              className="flex-1"
            />
            <Button onClick={bookSeats} className="bg-blue-500 hover:bg-blue-600">
              Book
            </Button>
          </div>
        </div>
        <Button
          onClick={resetBooking}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Reset Booking
        </Button>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-7 gap-2 max-w-3xl">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`
                h-12 flex items-center justify-center rounded-md text-sm font-medium
                ${seat.isReserved
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-green-500 text-green-50"
                }
                ${seat.id > 77 ? "col-span-1" : ""}
              `}
            >
              {seat.id}
              {seat.reservedBy === user?.firstName && <span className="ml-1">✓</span>}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-md">
            Reserved Seats = {reservedSeats}
          </div>
          <div className="bg-green-500 text-green-50 px-4 py-2 rounded-md">
            Available Seats = {availableSeats}
          </div>
        </div>
      </div>
      
    </div>
  )
}

