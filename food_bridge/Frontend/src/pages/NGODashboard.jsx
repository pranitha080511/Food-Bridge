import { useEffect, useState } from "react";

const NGODashboard = () => {
  const [donations, setDonations] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});

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

  const requestDonation = (id) => {
    const updated = donations.map((d) =>
      d.id === id
        ? {
            ...d,
            deliveryAddress: deliveryAddress[id],
            status: "Requested"
          }
        : d
    );

    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
    window.dispatchEvent(new Event("donationsUpdated"));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-6">
        NGO Dashboard
      </h1>

      {donations.map((d) => (
        <div key={d.id} className="bg-zinc-900 p-4 mb-4 rounded">
          <p className="font-bold">{d.food}</p>
          <p className="text-sm text-gray-400">
            Qty: {d.quantity}
          </p>
          <p className="text-yellow-400">
            Pickup: {d.pickupAddress}
          </p>

          {d.status === "Pending" && (
            <>
              <input
                className="w-full mt-3 p-2 bg-zinc-800 rounded"
                placeholder="Enter delivery address"
                value={deliveryAddress[d.id] || ""}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    [d.id]: e.target.value
                  })
                }
              />

              <button
                onClick={() => requestDonation(d.id)}
                className="mt-3 bg-blue-400 text-black px-4 py-2 rounded"
              >
                Request Donation
              </button>
            </>
          )}

          {d.status === "Requested" && (
            <p className="text-yellow-400 mt-2">
              ⏳ Waiting for volunteer
            </p>
          )}

          {d.status === "Accepted" && (
            <p className="text-green-400 mt-2">
              ✅ Accepted by {d.acceptedBy}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NGODashboard;
