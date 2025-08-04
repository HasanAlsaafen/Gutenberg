import React from "react";
import { FaUsers, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";

const ClientManagement = () => {
  const clients = [
    {
      name: "TechCorp Inc.",
      contact: "John Smith",
      email: "john@techcorp.com",
      phone: "+1-555-0123",
      projects: 3,
      status: "active",
    },
    {
      name: "Business Solutions Ltd.",
      contact: "Sarah Johnson",
      email: "sarah@bizsolve.com",
      phone: "+1-555-0456",
      projects: 2,
      status: "active",
    },
    {
      name: "StartupXYZ",
      contact: "Mike Chen",
      email: "mike@startupxyz.com",
      phone: "+1-555-0789",
      projects: 1,
      status: "inactive",
    },
  ];

  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FaUsers className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              Client Management
            </h1>
            <p className="text-gray-600">
              Manage your client relationships and contacts
            </p>
          </hgroup>
        </section>
      </header>

      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <header className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <nav className="flex justify-between text-sm font-semibold text-gray-900">
            <span className="flex-1">Company</span>
            <span className="flex-1">Contact</span>
            <span className="w-20 text-center">Projects</span>
            <span className="w-20 text-center">Status</span>
          </nav>
        </header>
        <section className="divide-y divide-gray-200">
          {clients.map((client, index) => (
            <article
              key={index}
              className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between gap-4"
            >
              <section className="flex items-center space-x-2 flex-1">
                <FaBuilding className="text-gray-400" />
                <span className="font-medium text-gray-900">{client.name}</span>
              </section>
              <section className="flex-1">
                <p className="font-medium text-gray-900">{client.contact}</p>
                <address className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 not-italic">
                  <span className="flex items-center space-x-1">
                    <FaEnvelope />
                    <span>{client.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaPhone />
                    <span>{client.phone}</span>
                  </span>
                </address>
              </section>
              <data
                value={client.projects}
                className="text-gray-900 w-20 text-center"
              >
                {client.projects}
              </data>
              <section className="w-20 flex justify-center">
                <mark
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {client.status}
                </mark>
              </section>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default ClientManagement;
