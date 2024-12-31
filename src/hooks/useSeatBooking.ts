// import { useState } from 'react';
// import { useSeats } from '@/pages/context/SeatContext';

// export const useSeatBooking = (userId: string | undefined) => {
//   const { seats, reserveSeats, cancelReservation } = useSeats();
//   const [numberOfSeats, setNumberOfSeats] = useState("");

//   const bookSeats = async (numSeats: number) => {
//     if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
//       throw new Error("Please enter a valid number of seats (1-7)");
//     }

//     const availableSeats = seats.filter(seat => !seat.isReserved);
    
//     if (availableSeats.length < numSeats) {
//       throw new Error("Not enough seats available");
//     }

//     const rows = Array.from(
//       { length: Math.ceil(seats.length / 7) }, 
//       (_, i) => seats.slice(i * 7, (i + 1) * 7)
//     );

//     let selectedSeats = [];
    
//     // Try to find consecutive seats in a single row
//     for (const row of rows) {
//       const availableInRow = row.filter(seat => !seat.isReserved);
//       if (availableInRow.length >= numSeats) {
//         selectedSeats = availableInRow.slice(0, numSeats);
//         break;
//       }
//     }

//     // If no consecutive seats found, just take the first available seats
//     if (selectedSeats.length === 0) {
//       selectedSeats = availableSeats.slice(0, numSeats);
//     }

//     const seatIds = selectedSeats.map(seat => seat.id);
    
//     if (!userId) {
//       throw new Error("User ID is not available");
//     }

//     await reserveSeats(seatIds, userId);
//   };

//   const resetBooking = async () => {
//     const reservedSeatIds = seats
//       .filter(seat => seat.isReserved)
//       .map(seat => seat.id);
    
//     if (reservedSeatIds.length > 0) {
//       await cancelReservation(reservedSeatIds);
//     }
//   };

//   const stats = {
//     reservedSeats: seats.filter((seat) => seat.isReserved).length,
//     availableSeats: seats.length - seats.filter((seat) => seat.isReserved).length
//   };

//   return {
//     numberOfSeats,
//     setNumberOfSeats,
//     bookSeats,
//     resetBooking,
//     stats
//   };
// };
