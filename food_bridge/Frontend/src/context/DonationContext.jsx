import { createContext, useContext, useState } from "react";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  const addDonation = (donation) => {
    setDonations((prev) => [...prev, donation]);
  };

  const acceptDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Accepted" } : d
      )
    );
  };

  return (
    <DonationContext.Provider
      value={{ donations, addDonation, acceptDonation }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => useContext(DonationContext);
