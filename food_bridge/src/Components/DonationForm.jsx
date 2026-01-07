import { useState } from "react";

const DonationForm = ({ onAddDonation }) => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [time, setTime] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onAddDonation({
      food,
      quantity,
      time,
      pickupAddress
    });

    setFood("");
    setQuantity("");
    setTime("");
    setPickupAddress("");
  };

  return (
    <form onSubmit={submitHandler} className="bg-zinc-900 p-5 rounded mb-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
        Donate Food
      </h2>

      <input
        placeholder="Food name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        required
      />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        required
      />

      <input
        placeholder="Pickup time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        required
      />

      <input
        placeholder="Pickup address"
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        required
      />

      <button className="bg-green-400 text-black px-4 py-2 rounded">
        Submit Donation
      </button>
    </form>
  );
};

export default DonationForm;
