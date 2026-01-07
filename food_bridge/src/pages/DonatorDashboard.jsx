import { useEffect, useState } from "react";
import DonatorNavbar from "../Components/DonatorNavbar";
import DonationForm from "../Components/DonationForm";

const DonatorDashboard = () => {
  const [donations, setDonations] = useState([]);

  const loadDonations = () => {
    const data = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);
  };

  useEffect(() => {
    loadDonations();
    window.addEventListener("donationsUpdated", loadDonations);
    return () =>
      window.removeEventListener("donationsUpdated", loadDonations);
  }, []);

  const addDonation = (donation) => {
    const updated = [
      ...donations,
      {
        id: Date.now(),
        food: donation.food,
        quantity: donation.quantity,
        time: donation.time,
        pickupAddress: donation.pickupAddress,
        deliveryAddress: "",
        status: "Pending",
        acceptedBy: ""
      }
    ];

    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
    window.dispatchEvent(new Event("donationsUpdated"));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <DonatorNavbar />

      <div className="max-w-4xl mx-auto p-6">
        <DonationForm onAddDonation={addDonation} />

        {donations.map((d) => (
          <div key={d.id} className="bg-zinc-900 p-4 mb-4 rounded">
            <p className="font-bold">{d.food}</p>
            <p className="text-sm text-gray-400">
              Qty: {d.quantity} | Time: {d.time}
            </p>
            <p className="text-yellow-400">
              Pickup: {d.pickupAddress}
            </p>

            <p className="text-blue-400 mt-1">
              Status: {d.status}
            </p>

            {d.status === "Accepted" && (
              <p className="text-green-400">
                ✅ Accepted by {d.acceptedBy}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonatorDashboard;
