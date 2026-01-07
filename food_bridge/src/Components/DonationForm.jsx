import { useState, useRef } from "react";

const DonationForm = ({ onAddDonation }) => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);

  const timeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!food || !quantity || !time || !location) {
      alert("Please fill all fields");
      return;
    }

    onAddDonation({
      id: 123,
      food: "Rice",
      quantity: "10kg",
      pickupAddress: "Hotel ABC",
      deliveryAddress: "NGO Home",
      status: "Accepted",
      requestedByNGO: true,
      acceptedBy: "Arun (Volunteer)"
    });

    // Clear form
    setFood("");
    setQuantity("");
    setTime("");
    setLocation("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-xl mb-8 border border-zinc-800"
    >
      <h2 className="text-xl font-bold text-green-400 mb-4">
        Donate Food
      </h2>

      {/* Food Name */}
      <input
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Food Name"
        className="w-full mb-3 p-3 bg-black border border-zinc-700 rounded text-gray-200"
      />

      {/* Quantity */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity (servings)"
        className="w-full mb-3 p-3 bg-black border border-zinc-700 rounded text-gray-200"
      />

      {/* Pickup Time */}
      <div className="relative mb-3">
        <input
          ref={timeRef}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 bg-black border border-zinc-700 rounded pr-12 text-gray-200"
        />
        <button
          type="button"
          onClick={() => timeRef.current?.showPicker()}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
        >
          ⏰
        </button>
      </div>

      {/* Location */}
      <textarea
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Pickup Location (Address / Area)"
        rows="3"
        className="w-full mb-4 p-3 bg-black border border-zinc-700 rounded text-gray-200"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-400 text-black py-3 rounded font-bold hover:bg-green-300 transition"
      >
        Submit Donation
      </button>
    </form>
  );
};

export default DonationForm;
