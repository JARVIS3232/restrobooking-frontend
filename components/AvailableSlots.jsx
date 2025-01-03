import { SLOTS } from "@/constants/index.d";
import { useEffect, useState } from "react";

const AvailableSlots = ({ slots, selectedSlot, onClose, onSelectSlot }) => {
  const [allSlots, setSlotsAvailability] = useState(SLOTS);

  const updateSlots = () => {
    return allSlots.map((slot) => ({
      ...slot,
      isBooked: slots.includes(slot.time),
    }));
  };
  useEffect(() => {
    setSlotsAvailability(updateSlots);
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Select a Time Slot</h3>
        <div className="grid grid-cols-3 lg:gap-4 md:gap-3 gap-2">
          {allSlots.map((slot) => (
            <div key={slot.time} className="relative group">
              <button
                key={slot.time}
                disabled={slot.isBooked}
                onClick={() => onSelectSlot(slot.time)}
                className={`w-full p-2 rounded-lg ${
                  slot.isBooked
                    ? "bg-gray-300 text-gray-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                } ${slot === selectedSlot ? "ring-2 ring-blue-500" : ""}`}
              >
                {slot.time}
              </button>
              {slot.isBooked && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Booked
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AvailableSlots;
