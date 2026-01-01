import { useState, useEffect } from "react";
import DonatorNavbar from "../Components/DonatorNavbar";
import DonationForm from "../Components/DonationForm";
import DonationList from "../Components/DonationList";  

const DonatorDashboard = () => {
  const [donations, setDonations] = useState([]);

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

  const addDonation = (donation) => {
    const updated = [...donations, donation];
    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);

    // 🔔 notify other dashboards
    window.dispatchEvent(new Event("donationsUpdated"));
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <DonatorNavbar />

      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <DonationForm onAddDonation={addDonation} />
          <DonationList donations={donations} />
        </div>
      </div>
    </div>
  );
};

export default DonatorDashboard;
