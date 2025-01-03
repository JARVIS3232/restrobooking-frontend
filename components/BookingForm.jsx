"use client";
import { useState } from "react";
import AvailableSlots from "@/components/AvailableSlots";
const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    name: "",
    contact: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "date") {
      setFormData({ ...formData, [name]: value, time: "" });
      fetchSlots(value);
    }
  };

  const fetchSlots = async (date) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/availability?date=${date}`
      );
      const data = await response.json();
      setSlots(data.slots);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error fetching slots:");
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setFormData({ ...formData, time: slot });
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getTomorrowDate()}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            readOnly
            placeholder="Select a slot"
            className="border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            min="1"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Enter your phone or email"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Book Table
        </button>
      </form>

      {isModalOpen && (
        <AvailableSlots
          slots={slots}
          selectedSlot={selectedSlot}
          onClose={() => setIsModalOpen(false)}
          onSelectSlot={handleSlotSelection}
        />
      )}
    </div>
  );
};

export default BookingForm;
