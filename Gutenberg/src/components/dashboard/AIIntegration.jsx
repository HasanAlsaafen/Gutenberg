import React from "react";
import { FaBrain, FaRobot, FaChartLine, FaCogs } from "react-icons/fa";

const AIIntegration = () => {
  const models = [
    {
      name: "Customer Sentiment Analysis",
      type: "NLP",
      accuracy: "94.2%",
      status: "deployed",
      requests: "12.5K",
    },
    {
      name: "Predictive Analytics Engine",
      type: "ML",
      accuracy: "89.7%",
      status: "training",
      requests: "8.2K",
    },
    {
      name: "Document Classification",
      type: "NLP",
      accuracy: "96.1%",
      status: "deployed",
      requests: "15.3K",
    },
  ];

  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <FaBrain className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">
              AI Integration Hub
            </h1>
            <p className="text-gray-600">
              Manage your artificial intelligence models and integrations
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6 mb-8">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Models
            </h3>
            <FaRobot className="text-purple-500 text-xl" aria-hidden="true" />
          </header>
          <data value="12" className="text-3xl font-bold text-purple-600">
            12
          </data>
          <p className="text-sm text-gray-500">Currently deployed</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              API Requests
            </h3>
            <FaChartLine className="text-pink-500 text-xl" aria-hidden="true" />
          </header>
          <data value="125000" className="text-3xl font-bold text-pink-600">
            125K
          </data>
          <p className="text-sm text-gray-500">This month</p>
        </article>
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Avg Accuracy
            </h3>
            <FaCogs className="text-indigo-500 text-xl" aria-hidden="true" />
          </header>
          <data value="93.4" className="text-3xl font-bold text-indigo-600">
            93.4%
          </data>
          <p className="text-sm text-gray-500">Model performance</p>
        </article>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Models</h2>
        <section className="flex flex-col gap-4">
          {models.map((model, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <section className="flex-1">
                  <header className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-600">{model.type}</p>
                  </header>
                </section>

                <aside className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Accuracy
                    </span>
                    <data
                      value={parseFloat(model.accuracy)}
                      className="text-lg font-semibold text-purple-600"
                    >
                      {model.accuracy}
                    </data>
                  </section>

                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        model.status === "deployed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {model.status}
                    </span>
                  </section>

                  <section className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Requests
                    </span>
                    <data
                      value={parseFloat(model.requests.replace("K", "")) * 1000}
                      className="text-lg font-semibold text-gray-900"
                    >
                      {model.requests}
                    </data>
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

export default AIIntegration;
