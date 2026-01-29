import { useNavigate } from "react-router-dom";

const DonatorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any saved login data
    localStorage.clear();

    // Go to main landing page
    navigate("/");
  };

  return (
    <nav className="bg-black border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <span className="text-yellow-400">Food Bridge</span>{" "}
        <span className="text-green-400">| Donator</span>
      </h1>

      <button
        onClick={handleLogout}
        className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default DonatorNavbar;
