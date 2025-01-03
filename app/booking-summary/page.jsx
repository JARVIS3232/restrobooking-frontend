"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const BookingSummary = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = searchParams.get("guests");
  const name = searchParams.get("name");
  const contact = searchParams.get("contact");
  const id = searchParams.get("_id");
  const handleDeleteBooking = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Booking Cancelled",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error cancelling booking !",
        variant: "destructive",
      });
      console.log("Error cancelling your booking !", error.message);
    }
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Thanks for booking",
    });
    router.push("/");
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Booking Confirmation
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Date:</span>
          <span className="text-gray-800">{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Time:</span>
          <span className="text-gray-800">{time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Guests:</span>
          <span className="text-gray-800">{guests}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Name:</span>
          <span className="text-gray-800">{name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Contact:</span>
          <span className="text-gray-800">{contact}</span>
        </div>
      </div>
      <div className="mt-6 text-center flex justify-center gap-4">
        <button
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
          onClick={handleDeleteBooking}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
