"use client";
import BookingForm from "../components/BookingForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleBooking = async (formData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    if (data.success) {
      const query = new URLSearchParams(data.booking).toString();
      router.push(`/booking-summary?${query}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Restaurant Booking System
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Plan your dining experience with ease. Book a table now!
        </p>
        <BookingForm onSubmit={handleBooking} />
      </div>
    </div>
  );
}
