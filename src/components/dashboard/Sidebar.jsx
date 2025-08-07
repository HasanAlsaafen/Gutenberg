import React from "react";
import {
  FaDesktop,
  FaCode,
  FaCog,
  FaBrain,
  FaUsers,
  FaClock,
  FaChartBar,
  FaCogs,
  FaHeadset,
  FaBars,
  FaHome,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({
  collapsed,
  setCollapsed,
  activeSection,
  setActiveSection,
}) => {
  const navigationItems = [
    { id: "overview", label: "Dashboard Overview", icon: FaHome },
    { id: "custom-software", label: "Custom Software", icon: FaCode },
    { id: "ready-tools", label: "Ready-Made Tools", icon: FaCog },
    { id: "ai-integration", label: "AI Integration", icon: FaBrain },
    { id: "consultation", label: "System Consultation", icon: FaDesktop },
  ];

  const secondaryItems = [
    { id: "clients", label: "Client Management", icon: FaUsers },
    { id: "orders", label: "Review Orders", icon: FaClipboardList },
    { id: "timeline", label: "Project Timeline", icon: FaClock },
    { id: "analytics", label: "Analytics & Reports", icon: FaChartBar },
    { id: "settings", label: "Settings", icon: FaCogs },
    { id: "support", label: "Support", icon: FaHeadset },
  ];

  const NavItem = ({ item, isActive, onClick }) => (
    <li>
      <button
        onClick={() => onClick(item.id)}
        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
            : "text-gray-300 hover:text-white hover:bg-slate-700"
        } ${collapsed ? "justify-center px-2" : "justify-start"}`}
      >
        <item.icon
          className={`${collapsed ? "text-xl" : "text-lg"} ${
            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
          }`}
        />
        {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
      </button>
    </li>
  );

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transition-all duration-300 z-50 flex flex-col ${
          collapsed ? "w-16" : "w-72"
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          {!collapsed && (
            <section className="flex items-center space-x-3">
              <figure className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </figure>
              <h1 className="text-white font-bold text-xl">Gutenberg</h1>
            </section>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </header>

        <nav className="flex-1 py-6 flex flex-col">
          <section>
            {!collapsed && (
              <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Main Services
              </h2>
            )}
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={setActiveSection}
                />
              ))}
            </ul>
          </section>

          <section className="mt-8">
            {!collapsed && (
              <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Management
              </h2>
            )}
            <ul className="space-y-1">
              {secondaryItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={setActiveSection}
                />
              ))}
            </ul>
          </section>
        </nav>

        {!collapsed && (
          <footer className="p-4 border-t border-slate-700">
            <section className="text-center text-xs text-gray-400">
              <p>Gutenberg Platform</p>
              <data value="1.0.0" className="text-purple-400">
                v1.0.0
              </data>
            </section>
          </footer>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
