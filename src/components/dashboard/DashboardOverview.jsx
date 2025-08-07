import React from "react";
import {
  FaCode,
  FaCog,
  FaBrain,
  FaDesktop,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaUsers,
  FaTasks,
  FaClock,
  FaPlus,
  FaRocket,
  FaCalendar,
} from "react-icons/fa";

const DashboardOverview = () => {
  const serviceMetrics = [
    {
      title: "Custom Software",
      icon: FaCode,
      value: "12",
      subtitle: "Active Projects",
      change: "+15%",
      positive: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Ready-Made Tools",
      icon: FaCog,
      value: "8.2K",
      subtitle: "Monthly Usage",
      change: "+23%",
      positive: true,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "AI Integration",
      icon: FaBrain,
      value: "94%",
      subtitle: "Model Accuracy",
      change: "+5%",
      positive: true,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "System Consultation",
      icon: FaDesktop,
      value: "4.8",
      subtitle: "Avg Rating",
      change: "-2%",
      positive: false,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
    },
  ];

  const businessMetrics = [
    {
      title: "Monthly Revenue",
      icon: FaDollarSign,
      value: "$127K",
      change: "+12%",
      positive: true,
    },
    {
      title: "Active Clients",
      icon: FaUsers,
      value: "34",
      change: "+8%",
      positive: true,
    },
    {
      title: "Projects Completed",
      icon: FaTasks,
      value: "89",
      change: "+25%",
      positive: true,
    },
    {
      title: "Avg Response Time",
      icon: FaClock,
      value: "2.4h",
      change: "-15%",
      positive: true,
    },
  ];

  const quickActions = [
    {
      title: "New Software Project",
      description: "Start custom development",
      icon: FaCode,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Deploy Tool",
      description: "Launch ready-made solution",
      icon: FaRocket,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "AI Model Training",
      description: "Start new integration",
      icon: FaBrain,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Schedule Consultation",
      description: "Book client meeting",
      icon: FaCalendar,
      color: "from-green-500 to-teal-500",
    },
  ];

  const MetricCard = ({ metric }) => (
    <article
      className={`${metric.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <header className="flex items-center justify-between mb-4">
        <figure
          className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}
        >
          <metric.icon className="text-white text-xl" />
        </figure>
        <aside
          className={`flex items-center text-sm font-medium ${
            metric.positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {metric.positive ? (
            <FaArrowUp className="mr-1" />
          ) : (
            <FaArrowDown className="mr-1" />
          )}
          <data
            value={parseFloat(
              metric.change.replace("%", "").replace("+", "").replace("-", "")
            )}
          >
            {metric.change}
          </data>
        </aside>
      </header>
      <section>
        <data
          className="text-2xl font-bold text-gray-900 mb-1"
          value={parseFloat(metric.value.replace(/[^\d.]/g, ""))}
        >
          {metric.value}
        </data>
        <p className="text-gray-600 text-sm">{metric.subtitle}</p>
        <p className="text-gray-500 text-xs mt-2">{metric.title}</p>
      </section>
    </article>
  );

  const BusinessMetricCard = ({ metric }) => (
    <article className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <header className="flex items-center justify-between mb-4">
        <figure className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <metric.icon className="text-gray-600 text-lg" />
        </figure>
        <aside
          className={`flex items-center text-sm font-medium ${
            metric.positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {metric.positive ? (
            <FaArrowUp className="mr-1" />
          ) : (
            <FaArrowDown className="mr-1" />
          )}
          <data
            value={parseFloat(
              metric.change.replace("%", "").replace("+", "").replace("-", "")
            )}
          >
            {metric.change}
          </data>
        </aside>
      </header>
      <section>
        <data
          className="text-xl font-bold text-gray-900 mb-1"
          value={parseFloat(metric.value.replace(/[^\d.]/g, ""))}
        >
          {metric.value}
        </data>
        <p className="text-gray-600 text-sm">{metric.title}</p>
      </section>
    </article>
  );

  const QuickActionCard = ({ action }) => (
    <article className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <section className="flex items-center space-x-4">
        <figure
          className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <action.icon className="text-white text-xl" />
        </figure>
        <hgroup className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
            {action.title}
          </h3>
          <p className="text-gray-600 text-sm">{action.description}</p>
        </hgroup>
        <FaPlus className="text-gray-400 group-hover:text-gray-600 transition-colors" />
      </section>
    </article>
  );

  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome to your Gutenberg B2B platform control center
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Service Performance
        </h2>
        <section className="flex flex-col md:flex-row lg:flex-row gap-6">
          {serviceMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </section>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Business Metrics
        </h2>
        <section className="flex flex-col md:flex-row lg:flex-row gap-6">
          {businessMetrics.map((metric, index) => (
            <BusinessMetricCard key={index} metric={metric} />
          ))}
        </section>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <section className="flex flex-col md:flex-row gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} action={action} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default DashboardOverview;
