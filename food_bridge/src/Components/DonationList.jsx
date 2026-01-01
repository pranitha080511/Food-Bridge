const DonationList = ({ donations }) => {
  if (donations.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No donations yet. Submit a donation to see it here.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
        My Donations
      </h2>

      <div className="space-y-4">
        {donations.map((d) => (
          <div
            key={d.id}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex justify-between items-start"
          >
            {/* Left Info */}
            <div>
              <p className="text-lg font-semibold text-gray-200">
                {d.food}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Quantity: {d.quantity}
              </p>

              <p className="text-sm text-gray-400">
                Pickup Time: {d.time}
              </p>

              <p className="text-sm text-gray-400">
                Location: {d.location}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold self-start
                ${
                  d.status === "Pending"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-400 text-black"
                }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;
