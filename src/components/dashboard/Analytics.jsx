import React from "react";
import { FaChartBar, FaChartLine } from "react-icons/fa";

const Analytics = () => {
  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <FaChartBar className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics & Reports
            </h1>
            <p className="text-gray-600">
              Business intelligence and performance metrics
            </p>
          </hgroup>
        </section>
      </header>

      <section className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center">
        <FaChartLine className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analytics Dashboard Coming Soon
        </h2>
        <p className="text-gray-600">
          Comprehensive analytics and reporting tools will be available here.
        </p>
      </section>
    </main>
  );
};

export default Analytics;
