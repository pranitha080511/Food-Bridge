import { useEffect, useState } from "react";

const VolunteerDashboard = () => {
  const [donations, setDonations] = useState([]);
  const volunteerName = "Arun (Volunteer)";

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

  const updateStatus = (id, status) => {
    const updated = donations.map((d) =>
      d.id === id
        ? {
            ...d,
            status,
            acceptedBy: status === "Accepted" ? volunteerName : ""
          }
        : d
    );

    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
    window.dispatchEvent(new Event("donationsUpdated"));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        Volunteer Dashboard
      </h1>

      {donations
        .filter((d) => d.status === "Requested")
        .map((d) => (
          <div key={d.id} className="bg-zinc-900 p-4 mb-4 rounded">
            <p className="font-bold">{d.food}</p>
            <p className="text-sm text-gray-400">
              Qty: {d.quantity}
            </p>
            <p className="text-yellow-400">
              Pickup: {d.pickupAddress}
            </p>
            <p className="text-green-400">
              Delivery: {d.deliveryAddress}
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => updateStatus(d.id, "Accepted")}
                className="bg-green-400 text-black px-4 py-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(d.id, "Declined")}
                className="bg-red-400 text-black px-4 py-2 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VolunteerDashboard;
