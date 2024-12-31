import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface BookingFormProps {
  numberOfSeats: string
  onNumberOfSeatsChange: (value: string) => void
  onBook: () => void
  onReset: () => void
}

export function BookingForm({
  numberOfSeats,
  onNumberOfSeatsChange,
  onBook,
  onReset,
}: BookingFormProps) {
  return (
    <div className="w-full lg:w-72 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Book Seats</h2>
        <div className="flex gap-2">
          <Input
            type="number"
            min="1"
            max="7"
            value={numberOfSeats}
            onChange={(e) => onNumberOfSeatsChange(e.target.value)}
            placeholder="Enter number of seats"
            className="flex-1"
          />
          <Button onClick={onBook} className="bg-blue-500 hover:bg-blue-600">
            Book
          </Button>
        </div>
      </div>
      <Button
        onClick={onReset}
        className="w-full bg-blue-500 hover:bg-blue-600"
      >
        Reset Booking
      </Button>
    </div>
  )
}

