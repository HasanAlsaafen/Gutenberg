import "./App.css";
import LandingPage from "./Pages/LandingPage";
import ServicesPage from "./Pages/ServicesPage";
import CareerPage from "./Pages/CareerPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/solutions" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
