import { SignIn, useUser, UserButton } from "@clerk/nextjs"
import { SeatBooking } from "../components/seatBooking"
import { useEffect } from "react"
import axios from "axios"

export default function Home() {
  const { user } = useUser();


  const foundfirstName=user?.firstName;
  const foundEmail=user?.emailAddresses[0].emailAddress;
  console.log('foundfirstName:', foundfirstName);
  console.log('foundEmail:', foundEmail);

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (user) {
        try {
          await axios.post('https://workwise-ticket-booking-backend.onrender.com/api/profile', {
            username:foundfirstName,
            email: foundEmail,
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUserWithBackend();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SignIn routing="hash" />
      </div>
    )
  }
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-6">Ticket Booking</h1>
          <div className="flex items-center">
            <h1 className="mr-4" >Welcome, <span className="text-blue-500">{user.firstName}</span></h1>
            <UserButton  />
          </div>
        </div>
        <SeatBooking />
      </div>
    </main>
  )
}

