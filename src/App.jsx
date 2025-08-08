import "./App.css";
import LandingPage from "./Pages/LandingPage";
import ServicesPage from "./Pages/ServicesPage";
import CareerPage from "./Pages/CareerPage";
import LoginPage from "./Pages/LoginPage";
import SolutionsPage from "./Pages/SolutionsPage";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import CareerForm from "./components/CareerForm";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./routes/PrivateRoute";
function App() {
  return (
    // <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/careers" element={<CareerPage />} />
      <Route path="/careers/*" element={<CareerPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      {/* Add other routes as needed */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </AuthProvider>
  );
}

export default App;
