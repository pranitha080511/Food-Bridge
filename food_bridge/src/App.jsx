import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import DonatorDashboard from "./Pages/DonatorDashboard";
import NGODashboard from "./Pages/NGODashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donator" element={<DonatorDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/ngoorganization" element={<NGODashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
