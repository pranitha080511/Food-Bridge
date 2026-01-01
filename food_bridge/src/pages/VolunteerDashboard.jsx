import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const acceptDonation = (id) => {
    const updated = donations.map((d) =>
      d.id === id ? { ...d, status: "Accepted" } : d
    );

    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <nav className="flex justify-between px-8 py-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-yellow-400">
          Food Bridge | Volunteer
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-black px-4 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Available Pickups
        </h2>

        {donations.filter(d => d.status === "Pending").length === 0 && (
          <p className="text-gray-400 text-center">
            No pending requests
          </p>
        )}

        {donations.map((d) =>
          d.status === "Pending" ? (
            <div
              key={d.id}
              className="bg-zinc-900 p-5 mb-4 rounded flex justify-between"
            >
              <div>
                <p className="font-semibold">{d.food}</p>
                <p className="text-sm text-gray-400">
                  Qty: {d.quantity} | Time: {d.time}
                </p>
              </div>

              <button
                onClick={() => acceptDonation(d.id)}
                className="bg-green-400 text-black px-5 py-2 rounded font-semibold"
              >
                Accept
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
