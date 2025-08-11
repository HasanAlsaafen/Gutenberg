import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <section className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-72"
        } overflow-auto`}
      >
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Gutenberg Dashboard
          </h1>
        </header>

        <DashboardContent activeSection={activeSection} />
      </main>
    </section>
  );
};

export default Dashboard;
