import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import {
  FaSpinner,
  FaExclamationTriangle,
  FaServicestack,
} from "react-icons/fa";
import CallToAction from "../components/CallToAction";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();

  const id = serviceId;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setError("Service ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://gutenberg-server-production.up.railway.app/api/services/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Service not found");
          } else {
            throw new Error(`Server error: ${response.status}`);
          }
        }

        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Loading Component
  const LoadingComponent = () => (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
      <section className="text-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600 mx-auto mb-4" />
        <p className="text-xl text-gray-600">Loading service details...</p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we fetch the information
        </p>
      </section>
    </main>
  );

  // Error Component
  const ErrorComponent = ({ error }) => (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
      <section className="text-center max-w-md mx-auto px-4">
        <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Service Not Found
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          Go Back
        </button>
      </section>
    </main>
  );

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  if (!service) return <ErrorComponent error="Service data not available" />;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />

      {/* Service Detail Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Service Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-6">
              <FaServicestack className="text-white text-2xl" />
            </div>
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full mb-4">
              Service ID: {service.serviceId}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {service.title}
            </h1>
          </div>

          {/* Service Image */}
          {service.image && (
            <div className="mb-12 flex justify-center">
              <div className="relative max-w-2xl w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Service Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded mr-4"></span>
              Description
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>

          {/* Service Info Card */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Service Information
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <span className="text-gray-600">Service ID:</span>
                    <span className="font-semibold text-purple-700">
                      {service.serviceId}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-semibold text-gray-900">
                      {service.title}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <span className="text-gray-600">Has Image:</span>
                    <span className="font-semibold text-gray-900">
                      {service.image ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white text-2xl font-bold shadow-lg">
                  {service.serviceId}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 font-semibold"
            >
              Go Back
            </button>
            <button
              onClick={() => (window.location.href = "/#contact")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
            >
              Get This Service
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      <Footer />
    </main>
  );
};

export default ServiceDetailPage;
