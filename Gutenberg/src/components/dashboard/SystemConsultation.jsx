import React from "react";
import { FaDesktop, FaCalendar, FaUser, FaStar } from "react-icons/fa";

const SystemConsultation = () => {
  const consultations = [
    {
      id: 1,
      client: "TechStart Inc.",
      consultant: "Dr. Sarah Johnson",
      date: "2025-08-15",
      time: "10:00 AM",
      type: "Infrastructure Assessment",
      status: "scheduled",
      rating: null,
    },
    {
      id: 2,
      client: "Global Corp",
      consultant: "Michael Chen",
      date: "2025-08-10",
      time: "2:30 PM",
      type: "Security Audit",
      status: "completed",
      rating: 5,
    },
    {
      id: 3,
      client: "StartupXYZ",
      consultant: "Emily Rodriguez",
      date: "2025-08-20",
      time: "11:00 AM",
      type: "Cloud Migration",
      status: "scheduled",
      rating: null,
    },
  ];

  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <FaDesktop className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              System Consultation
            </h1>
            <p className="text-gray-600">
              Manage expert IT infrastructure consultations
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6 mb-8">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            This Month
          </h3>
          <data value="28" className="text-3xl font-bold text-green-600">
            28
          </data>
          <p className="text-sm text-gray-500">Consultations</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Avg Rating
          </h3>
          <data value="4.8" className="text-3xl font-bold text-yellow-600">
            4.8
          </data>
          <p className="text-sm text-gray-500">Client satisfaction</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Response Time
          </h3>
          <data value="2.4" className="text-3xl font-bold text-blue-600">
            2.4h
          </data>
          <p className="text-sm text-gray-500">Average</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
          <data value="32000" className="text-3xl font-bold text-purple-600">
            $32K
          </data>
          <p className="text-sm text-gray-500">This month</p>
        </article>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Upcoming Consultations
        </h2>
        <section className="flex flex-col gap-4">
          {consultations.map((consultation) => (
            <article
              key={consultation.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <section className="flex-1">
                  <header className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaUser className="text-gray-400" />
                      <span>{consultation.client}</span>
                    </h3>
                    <p className="text-gray-600">
                      Consultant: {consultation.consultant}
                    </p>
                  </header>
                </section>

                <aside className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Date & Time
                    </span>
                    <section className="flex items-center space-x-2">
                      <FaCalendar className="text-gray-400" />
                      <section>
                        <time
                          dateTime={consultation.date}
                          className="text-gray-900"
                        >
                          {consultation.date}
                        </time>
                        <p className="text-sm text-gray-500">
                          {consultation.time}
                        </p>
                      </section>
                    </section>
                  </section>

                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Type
                    </span>
                    <p className="text-gray-900">{consultation.type}</p>
                  </section>

                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Status
                    </span>
                    <mark
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        consultation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {consultation.status}
                    </mark>
                  </section>

                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Rating
                    </span>
                    {consultation.rating ? (
                      <section className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <data
                          value={consultation.rating}
                          className="text-gray-900"
                        >
                          {consultation.rating}
                        </data>
                      </section>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </section>
                </aside>
              </section>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default SystemConsultation;
