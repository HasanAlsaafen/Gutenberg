import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCode, FaCog, FaBrain, FaDesktop, FaDatabase } from "react-icons/fa";

const ICON_MAP = {
  "Custom Software": FaCode,
  "Ready-Made Tools": FaCog,
  "AI Integration": FaBrain,
  "System Consultation": FaDesktop,
  "Web Development": FaCode,
  "Database Design": FaDatabase,
};

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://gutenberg-server-production.up.railway.app/api/Services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        if (err.response) {
          setError(
            `Failed to load services: ${err.response.status} ${err.response.statusText}`
          );
        } else if (err.request) {
          setError(
            "No response from server. Check your network or CORS policy."
          );
        } else {
          setError("Failed to load services. Unknown error.");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white text-center">
        <h2 className="text-2xl font-bold">Loading services...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white text-center">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-6 lg:px-8">
        <header className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Services
          </h2>
          <span className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex"></span>
        </header>

        <section className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.title] || FaCode;
            // Custom colors for specific services
            let cardBg = "bg-blue-50 hover:bg-blue-100";
            let iconBg = "from-blue-500 to-cyan-500";
            let iconText = "text-white";
            if (service.title === "Web Development") {
              cardBg = "bg-yellow-50 hover:bg-yellow-100";
              iconBg = "from-yellow-400 to-yellow-600";
              iconText = "text-yellow-900";
            } else if (service.title === "Database Design") {
              cardBg = "bg-green-50 hover:bg-green-100";
              iconBg = "from-green-400 to-green-600";
              iconText = "text-green-900";
            }
            return (
              <article
                key={service._id || index}
                className={`group ${cardBg} p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100 flex-1 min-w-[280px] max-w-[320px] flex flex-col`}
              >
                <header className="text-center flex flex-col items-center space-y-6 flex-1">
                  <figure
                    className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300 items-center justify-center`}
                  >
                    <Icon className={`${iconText} text-3xl`} />
                  </figure>

                  <hgroup className="flex flex-col space-y-3 flex-1 justify-center">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                      {service.title || service.name}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {service.description || service.shortDescription}
                    </p>
                  </hgroup>
                </header>
              </article>
            );
          })}
        </section>
      </main>
    </section>
  );
};

export default ServicesPreview;
