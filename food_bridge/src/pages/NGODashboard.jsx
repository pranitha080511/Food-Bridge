import { useEffect, useState } from "react";

const NGODashboard = () => {
  const [donations, setDonations] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});

  const loadDonations = () => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  };

  useEffect(() => {
    loadDonations();
    const handler = () => loadDonations();
    window.addEventListener("donationsUpdated", handler);
    return () => window.removeEventListener("donationsUpdated", handler);
  }, []);

  const requestDonation = (id) => {
    const updated = donations.map((d) =>
      d.id === id
        ? {
            ...d,
            deliveryAddress: deliveryAddress[id],
            status: "Requested",
            requestedByNGO: true
          }
        : d
    );

    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
    window.dispatchEvent(new Event("donationsUpdated"));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-blue-400">
          Food Bridge | NGO
        </h1>
      </nav>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Donation Requests
        </h2>

        {donations.length === 0 && (
          <p className="text-gray-400 text-center">
            No donations available
          </p>
        )}

        {donations.map((d) => (
          <div
            key={d.id}
            className="bg-zinc-900 p-5 mb-5 rounded-lg"
          >
            <p className="text-lg font-semibold">
               {d.food}
            </p>

            <p className="text-sm text-gray-400">
              Qty: {d.quantity}
            </p>

            <p className="text-sm text-yellow-400 mt-1">
              📍 Pickup: {d.pickupAddress}
            </p>

            {/* PENDING */}
            {d.status === "Pending" && (
              <>
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full mt-3 p-2 rounded bg-zinc-800"
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

            {/* REQUESTED */}
            {d.status === "Requested" && (
              <p className="mt-3 text-yellow-400 font-semibold">
                ⏳ Waiting for volunteer acceptance
              </p>
            )}

            {/* ACCEPTED */}
            {d.status === "Accepted" && (
              <p className="mt-3 text-green-400 font-semibold">
                ✅ Accepted by {d.acceptedBy}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGODashboard;
