import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      navigate("/login");
    }
  }, []);
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Gutenberg Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("Name");
              localStorage.removeItem("Role");
              navigate("/login");
            }}
            className="bg-red-700 p-2 rounded-2xl text-white"
          >
            {" "}
            log out
          </button>
        </header>

        <DashboardContent activeSection={activeSection} />
      </main>
    </section>
  );
};

export default Dashboard;
