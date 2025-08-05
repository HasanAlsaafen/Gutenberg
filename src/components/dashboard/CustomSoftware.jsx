import React from "react";
import {
  FaCode,
  FaPlay,
  FaPause,
  FaCheck,
  FaClock,
  FaUser,
  FaCalendar,
} from "react-icons/fa";

const CustomSoftware = () => {
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      client: "TechCorp Inc.",
      status: "in-progress",
      progress: 75,
      deadline: "2025-09-15",
      team: ["John D.", "Sarah M.", "Mike R."],
      technology: "React, Node.js, MongoDB",
    },
    {
      id: 2,
      name: "CRM System",
      client: "Business Solutions Ltd.",
      status: "in-progress",
      progress: 45,
      deadline: "2025-10-20",
      team: ["Alice K.", "Bob L."],
      technology: "Vue.js, Python, PostgreSQL",
    },
    {
      id: 3,
      name: "Inventory Management",
      client: "Retail Chain Co.",
      status: "completed",
      progress: 100,
      deadline: "2025-07-30",
      team: ["Emma W.", "David P."],
      technology: "Angular, .NET, SQL Server",
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      client: "Data Insights Inc.",
      status: "planning",
      progress: 10,
      deadline: "2025-11-30",
      team: ["Chris T."],
      technology: "React, Python, Elasticsearch",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheck className="text-green-600" />;
      case "in-progress":
        return <FaPlay className="text-blue-600" />;
      case "planning":
        return <FaClock className="text-yellow-600" />;
      default:
        return <FaPause className="text-gray-600" />;
    }
  };

  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <FaCode className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              Custom Software Development
            </h1>
            <p className="text-gray-600">
              Manage your tailored software projects
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6 mb-8">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Active Projects
          </h3>
          <data value="8" className="text-3xl font-bold text-blue-600">
            8
          </data>
          <p className="text-sm text-gray-500">Currently in development</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Completed
          </h3>
          <data value="24" className="text-3xl font-bold text-green-600">
            24
          </data>
          <p className="text-sm text-gray-500">This quarter</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Average Time
          </h3>
          <data value="3.2" className="text-3xl font-bold text-purple-600">
            3.2m
          </data>
          <p className="text-sm text-gray-500">Project completion</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Client Satisfaction
          </h3>
          <data value="96" className="text-3xl font-bold text-indigo-600">
            96%
          </data>
          <p className="text-sm text-gray-500">Average rating</p>
        </article>
      </section>

      <section>
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Projects
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <FaCode />
            <span>New Project</span>
          </button>
        </header>

        <section className="bg-white rounded-xl shadow-lg overflow-hidden">
          <header className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <nav className="flex justify-between text-sm font-semibold text-gray-900">
              <span className="flex-2">Project</span>
              <span className="flex-1">Client</span>
              <span className="flex-1">Status</span>
              <span className="flex-1">Progress</span>
              <span className="flex-1">Deadline</span>
              <span className="w-20">Team</span>
            </nav>
          </header>
          <section className="divide-y divide-gray-200">
            {projects.map((project) => (
              <article
                key={project.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
              >
                <section className="flex-2">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500">{project.technology}</p>
                </section>
                <section className="flex items-center space-x-2 flex-1">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-900">{project.client}</span>
                </section>
                <section className="flex items-center space-x-2 flex-1">
                  {getStatusIcon(project.status)}
                  <mark
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.replace("-", " ")}
                  </mark>
                </section>
                <section className="flex items-center space-x-3 flex-1">
                  <progress
                    className="flex-1 bg-gray-200 rounded-full h-2"
                    value={project.progress}
                    max="100"
                  >
                    <span
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300 block"
                      style={{ width: `${project.progress}%` }}
                    />
                  </progress>
                  <data
                    value={project.progress}
                    className="text-sm font-medium text-gray-900"
                  >
                    {project.progress}%
                  </data>
                </section>
                <section className="flex items-center space-x-2 flex-1">
                  <FaCalendar className="text-gray-400" />
                  <time dateTime={project.deadline} className="text-gray-900">
                    {project.deadline}
                  </time>
                </section>
                <section className="flex -space-x-2 w-20 justify-end">
                  {project.team.map((member, index) => (
                    <figure
                      key={index}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                      title={member}
                    >
                      {member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </figure>
                  ))}
                </section>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default CustomSoftware;
