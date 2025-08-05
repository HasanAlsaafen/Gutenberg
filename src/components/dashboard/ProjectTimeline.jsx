import React from "react";
import { FaClock, FaTasks, FaCalendar } from "react-icons/fa";

const ProjectTimeline = () => {
  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <FaClock className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              Project Timeline
            </h1>
            <p className="text-gray-600">
              Track project milestones and deadlines
            </p>
          </hgroup>
        </section>
      </header>

      <section className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center">
        <FaCalendar className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Timeline View Coming Soon
        </h2>
        <p className="text-gray-600">
          Interactive project timeline and milestone tracking will be available
          here.
        </p>
      </section>
    </main>
  );
};

export default ProjectTimeline;
