import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import {
  FaCode,
  FaCog,
  FaBrain,
  FaDesktop,
  FaSpinner,
  FaCheck,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import CallToAction from "../components/CallToAction";

const ServicesPage = () => {
  const [service, setService] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get("serviceId");

    if (!serviceId) {
      setError("No service selected. Please select a service from the menu.");
      return;
    }

    const fetchService = async () => {
      try {
        const response = await fetch(
          `https://gutenberg-server-production.up.railway.app/api/Services/${serviceId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service details.");
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchService();
  }, [location.search]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!service) {
    return <div>Loading service details...</div>;
  }

  const ServiceSection = ({ service, index }) => {
    const Icon = service.icon;

    return (
      <article
        className={`py-16 sm:py-20 lg:py-24 ${
          index % 2 === 0
            ? "bg-white"
            : "bg-gradient-to-br from-slate-50 to-gray-50"
        }`}
      >
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-7xl mx-auto">
            {/* Service Header */}
            <header className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center justify-between mb-12 sm:mb-16 lg:mb-20">
              {/* Service Icon */}
              <figure className="flex justify-center items-center flex-1 w-full max-w-sm sm:max-w-md lg:max-w-none group order-1 lg:order-none">
                <section className="flex justify-center items-center">
                  <section className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 group-hover:scale-105 overflow-hidden relative">
                    <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                    <Icon className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl group-hover:scale-110 transition-transform duration-300 z-10 drop-shadow-lg" />
                  </section>
                </section>
              </figure>

              {/* Service Header Content */}
              <section className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8 flex-1 text-center lg:text-left w-full order-2 lg:order-none">
                <nav className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6">
                  <aside className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-2 sm:mb-4">
                    <span className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-sm font-semibold rounded-full border border-purple-200">
                      {service.category}
                    </span>
                    <aside className="flex items-center gap-2">
                      <FaStar className="text-yellow-500 text-sm sm:text-base" />
                      <span className="text-sm font-semibold text-gray-700">
                        {service.rating} ({service.reviewsCount} reviews)
                      </span>
                    </aside>
                  </aside>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    {service.name}
                  </h2>

                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl sm:max-w-2xl mx-auto lg:mx-0 font-light">
                    {service.shortDescription}
                  </p>

                  <footer className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4">
                    <aside className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        Price:
                      </span>
                      <span className="text-purple-600 font-bold text-base sm:text-lg">
                        {service.price}
                      </span>
                    </aside>
                    <aside className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        Duration:
                      </span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {service.duration}
                      </span>
                    </aside>
                  </footer>
                </nav>
              </section>
            </header>

            <main className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20">
              <section className="flex flex-col space-y-8 sm:space-y-10 flex-1">
                <article>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-0 sm:mr-4 mb-2 sm:mb-0"></span>
                    Overview
                  </h3>
                  <section className="flex flex-col space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 p-4 sm:p-6 rounded-xl border-l-4 border-purple-500">
                      {service.detailedDescription}
                    </p>
                  </section>
                </article>

                <article>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-0 sm:mr-4 mb-2 sm:mb-0"></span>
                    Key Benefits
                  </h3>
                  <ul className="flex flex-col space-y-3 sm:space-y-4">
                    {service.benefits?.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start space-x-3 sm:space-x-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300"
                      >
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0 text-base sm:text-lg" />
                        <span className="text-gray-700 font-semibold text-base sm:text-lg">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-0 sm:mr-4 mb-2 sm:mb-0"></span>
                    Technologies
                  </h3>
                  <section className="flex flex-wrap gap-2 sm:gap-3">
                    {service.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-xl text-sm sm:text-base font-semibold hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 transition-all duration-300 border border-gray-200 hover:border-purple-300 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </section>
                </article>
              </section>

              <section className="flex flex-col space-y-8 sm:space-y-10 flex-1">
                <article>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-0 sm:mr-4 mb-2 sm:mb-0"></span>
                    Features & Capabilities
                  </h3>
                  <ul className="flex flex-col gap-3 sm:gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3 sm:space-x-4 text-gray-700 bg-white rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 group"
                      >
                        <span className="w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300"></span>
                        <span className="text-sm sm:text-base font-semibold group-hover:text-purple-700 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="w-8 sm:w-10 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-0 sm:mr-4 mb-2 sm:mb-0"></span>
                    Our Process
                  </h3>
                  <section className="flex flex-col space-y-3 sm:space-y-4">
                    {service.processSteps?.map((step, stepIndex) => (
                      <article
                        key={stepIndex}
                        className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group"
                      >
                        <aside className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                          {stepIndex + 1}
                        </aside>
                        <span className="text-gray-800 font-semibold text-base sm:text-lg group-hover:text-purple-700 transition-colors duration-300 flex-1">
                          {step}
                        </span>
                        {stepIndex < service.processSteps.length - 1 && (
                          <FaArrowRight className="text-gray-400 group-hover:text-purple-500 transition-colors duration-300 flex-shrink-0" />
                        )}
                      </article>
                    ))}
                  </section>
                </article>
              </section>
            </main>
          </article>
        </section>
      </article>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Services Overview */}
      <section className="py-16 bg-white">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              From initial consultation to ongoing support, we provide
              end-to-end solutions that drive real business results. Explore our
              comprehensive service offerings below.
            </p>
          </header>
        </main>
      </section>

      {/* Detailed Services Sections */}
      <section className="w-full">
        {service ? (
          <ServiceSection service={service} index={0} />
        ) : (
          <section className="py-20 text-center bg-white">
            <article className="max-w-md mx-auto">
              <figure className="text-gray-400 text-6xl mb-4">🔍</figure>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Service Found
              </h3>
              <p className="text-gray-600">
                The service you are looking for does not exist or has been
                removed.
              </p>
            </article>
          </section>
        )}
      </section>
    </main>
  );
};

export default ServicesPage;
