import React, { useState } from 'react'
import { useSeats } from '../context/SeatContext'
import { useAuth } from '../context/AuthContext'

const SeatReservation: React.FC = () => {
  const { seats, reserveSeats, cancelReservation } = useSeats()
  const { user } = useAuth()
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  const handleSeatClick = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
    } else if (selectedSeats.length < 7) {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleReservation = () => {
    if (user && selectedSeats.length > 0) {
      reserveSeats(selectedSeats, user)
      setSelectedSeats([])
    }
  }

  const handleCancellation = () => {
    if (user) {
      const userSeats = seats.filter(seat => seat.reservedBy === user).map(seat => seat.id)
      cancelReservation(userSeats)
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {seats.map((seat, index) => (
          <button
            key={seat.id}
            className={`p-2 text-center ${
              seat.isReserved
                ? 'bg-red-500 text-white'
                : selectedSeats.includes(seat.id)
                ? 'bg-yellow-500'
                : 'bg-green-500'
            } ${index >= 77 && index <= 79 ? 'col-span-1' : ''}`}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.isReserved || !user}
          >
            {seat.id}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleReservation}
          disabled={!user || selectedSeats.length === 0}
        >
          Reserve Selected Seats
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded"
          onClick={handleCancellation}
          disabled={!user}
        >
          Cancel My Reservations
        </button>
      </div>
    </div>
  )
}

export default SeatReservation

