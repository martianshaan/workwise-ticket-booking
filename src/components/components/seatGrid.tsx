interface Seat {
    id: number
    isBooked: boolean
  }
  
  interface SeatGridProps {
    seats: Seat[]
  }
  
  export function SeatGrid({ seats }: SeatGridProps) {
    return (
      <div className="grid grid-cols-7 gap-2 max-w-3xl">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`
              h-12 flex items-center justify-center rounded-md text-sm font-medium
              ${
                seat.isBooked
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-green-500 text-green-50"
              }
              ${seat.id > 77 ? "col-span-1" : ""}
            `}
          >
            {seat.id}
          </div>
        ))}
      </div>
    )
  }
  
  