interface BookingStatsProps {
    bookedSeats: number
    availableSeats: number
  }
  
  export function BookingStats({ bookedSeats, availableSeats }: BookingStatsProps) {
    return (
      <div className="flex gap-4 mt-6">
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-md">
          Booked Seats = {bookedSeats}
        </div>
        <div className="bg-green-500 text-green-50 px-4 py-2 rounded-md">
          Available Seats = {availableSeats}
        </div>
      </div>
    )
  }
  
  