import React from "react";
import {
  FaCog,
  FaDownload,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

const ReadyTools = () => {
  const tools = [
    {
      id: 1,
      name: "ProjectManager Pro",
      description: "Complete project management solution",
      category: "Productivity",
      downloads: 2450,
      activeUsers: 890,
      rating: 4.8,
      status: "live",
      version: "2.1.4",
    },
    {
      id: 2,
      name: "DataSync Enterprise",
      description: "Real-time data synchronization tool",
      category: "Data Management",
      downloads: 1890,
      activeUsers: 634,
      rating: 4.6,
      status: "live",
      version: "1.9.2",
    },
    {
      id: 3,
      name: "SecureAuth Gateway",
      description: "Multi-factor authentication system",
      category: "Security",
      downloads: 3200,
      activeUsers: 1250,
      rating: 4.9,
      status: "live",
      version: "3.0.1",
    },
    {
      id: 4,
      name: "ReportBuilder AI",
      description: "Automated report generation",
      category: "Analytics",
      downloads: 0,
      activeUsers: 0,
      rating: 0,
      status: "development",
      version: "1.0.0-beta",
    },
  ];

  const categories = [
    { name: "Productivity", count: 8, color: "from-blue-500 to-cyan-500" },
    {
      name: "Data Management",
      count: 5,
      color: "from-indigo-500 to-purple-500",
    },
    { name: "Security", count: 6, color: "from-purple-500 to-pink-500" },
    { name: "Analytics", count: 4, color: "from-green-500 to-teal-500" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800";
      case "development":
        return "bg-yellow-100 text-yellow-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FaCog className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              Ready-Made Tools
            </h1>
            <p className="text-gray-600">
              Manage your off-the-shelf software products
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6 mb-8">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Downloads
            </h3>
            <FaDownload className="text-indigo-500 text-xl" />
          </header>
          <data value="7500" className="text-3xl font-bold text-indigo-600">
            7.5K
          </data>
          <p className="text-sm text-gray-500">This month</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Users
            </h3>
            <FaUsers className="text-purple-500 text-xl" />
          </header>
          <data value="2800" className="text-3xl font-bold text-purple-600">
            2.8K
          </data>
          <p className="text-sm text-gray-500">Currently online</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <FaChartLine className="text-green-500 text-xl" />
          </header>
          <data value="45000" className="text-3xl font-bold text-green-600">
            $45K
          </data>
          <p className="text-sm text-gray-500">Monthly recurring</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Rating</h3>
            <FaShieldAlt className="text-yellow-500 text-xl" />
          </header>
          <data value="4.7" className="text-3xl font-bold text-yellow-600">
            4.7
          </data>
          <p className="text-sm text-gray-500">Customer satisfaction</p>
        </article>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Tool Categories
        </h2>
        <section className="flex flex-col md:flex-row gap-6">
          {categories.map((category, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex-1"
            >
              <header className="flex items-center justify-between mb-4">
                <figure
                  className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}
                >
                  <FaCog className="text-white" />
                </figure>
                <data
                  value={category.count}
                  className="text-2xl font-bold text-gray-900"
                >
                  {category.count}
                </data>
              </header>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">Available tools</p>
            </article>
          ))}
        </section>
      </section>

      <section>
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Tools
          </h2>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <FaRocket />
            <span>Deploy New Tool</span>
          </button>
        </header>

        <section className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
          {tools.map((tool) => (
            <article
              key={tool.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 min-w-0 lg:max-w-[calc(50%-0.75rem)]"
            >
              <header className="flex items-start justify-between mb-4">
                <section className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {tool.description}
                  </p>
                  <mark className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {tool.category}
                  </mark>
                </section>
                <aside
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    tool.status
                  )}`}
                >
                  {tool.status}
                </aside>
              </header>

              <section className="flex justify-between gap-4 mb-4">
                <section className="text-center flex-1">
                  <data
                    value={tool.downloads}
                    className="text-2xl font-bold text-indigo-600"
                  >
                    {tool.downloads.toLocaleString()}
                  </data>
                  <p className="text-xs text-gray-500">Downloads</p>
                </section>
                <section className="text-center flex-1">
                  <data
                    value={tool.activeUsers}
                    className="text-2xl font-bold text-purple-600"
                  >
                    {tool.activeUsers.toLocaleString()}
                  </data>
                  <p className="text-xs text-gray-500">Active Users</p>
                </section>
                <section className="text-center flex-1">
                  <data
                    value={tool.rating || 0}
                    className="text-2xl font-bold text-yellow-600"
                  >
                    {tool.rating || "N/A"}
                  </data>
                  <p className="text-xs text-gray-500">Rating</p>
                </section>
              </section>

              <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Version {tool.version}
                </span>
                <nav className="flex space-x-2">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                    View Details
                  </button>
                  {tool.status === "live" && (
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm transition-colors">
                      Manage
                    </button>
                  )}
                </nav>
              </footer>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default ReadyTools;
