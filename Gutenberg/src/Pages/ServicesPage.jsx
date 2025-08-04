import React from "react";
import { FaCode, FaCog, FaBrain, FaDesktop } from "react-icons/fa";
import CallToAction from "../components/CallToAction";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: "Custom Software",
      description:
        "We build tailored digital solutions designed specifically for your business requirements. Our team creates robust, scalable applications that perfectly align with your workflow, processes, and goals. From web applications to mobile apps, we deliver software that grows with your business and provides a competitive edge in your industry.",
      features: [
        "Cross-platform apps",
        "Clean scalable code",
        "Agile development",
        "Full-stack expertise",
      ],
      icon: FaCode,
    },
    {
      id: 2,
      name: "Ready-Made Tools",
      description:
        "Access our collection of pre-built, battle-tested software solutions that can be quickly deployed to boost your team's productivity. These tools are designed based on common business needs and can be customized to fit your specific requirements. Get up and running in days, not months, with solutions that have proven ROI.",
      features: [
        "Fast deployment",
        "Cost-effective",
        "Seamless integration",
        "Regular updates",
      ],
      icon: FaCog,
    },
    {
      id: 3,
      name: "AI Integration",
      description:
        "Transform your business operations with cutting-edge artificial intelligence solutions. We help you leverage machine learning, natural language processing, and predictive analytics to automate processes, gain insights from your data, and make smarter business decisions. Our AI implementations are practical, measurable, and designed to deliver real business value.",
      features: [
        "Machine learning",
        "Predictive analytics",
        "Workflow automation",
        "Custom AI models",
      ],
      icon: FaBrain,
    },
    {
      id: 4,
      name: "System Consultation",
      description:
        "Get expert guidance on your IT infrastructure, architecture decisions, and technology strategy. Our experienced consultants analyze your current systems, identify bottlenecks and opportunities, and provide actionable recommendations. Whether you're planning a cloud migration, system modernization, or technology stack evaluation, we help you make informed decisions that drive business growth.",
      features: [
        "Cloud migration",
        "Infrastructure audits",
        "Planning & strategy",
        "Vendor recommendations",
      ],
      icon: FaDesktop,
    },
  ];

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
          <article
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-12 sm:gap-16 lg:gap-20 items-center justify-center max-w-7xl mx-auto`}
          >
            <figure className="flex justify-center items-center flex-1 w-full max-w-md lg:max-w-none group">
              <section className="flex justify-center items-center">
                <section className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105 overflow-hidden">
                  <span className="bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Icon className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300" />
                </section>
              </section>
            </figure>

            <section className="flex flex-col space-y-6 sm:space-y-8 flex-1 text-center lg:text-left w-full">
              <header className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {service.name}
                </h2>

                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                  {service.description}
                </p>
              </header>

              <section className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center justify-center lg:justify-start">
                  <span className="w-8 h-px bg-gradient-to-r from-purple-600 to-indigo-600 mr-3"></span>
                  Key Features
                  <span className="w-8 h-px bg-gradient-to-r from-indigo-600 to-purple-600 ml-3"></span>
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center justify-center lg:justify-start space-x-3 text-gray-700 bg-white/50 rounded-lg p-3 hover:bg-white/80 transition-colors duration-200 border border-gray-100 hover:border-purple-200"
                    >
                      <span className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex-shrink-0 shadow-sm"></span>
                      <span className="text-base sm:text-lg font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <footer className="pt-4 sm:pt-6 flex justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 w-full sm:w-auto max-w-xs overflow-hidden">
                  <span className="bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span>Learn More</span>
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-2">
                    →
                  </span>
                </button>
              </footer>
            </section>
          </article>
        </section>
      </article>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 sm:py-20 lg:py-32 overflow-hidden">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center text-white max-w-5xl mx-auto">
            <section className="space-y-6 sm:space-y-8">
              <nav className="flex justify-center mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-300 text-sm font-medium">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Our Solutions
                </span>
              </nav>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                <span className="block opacity-90">Our</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                  Services
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto px-4 font-light">
                We offer tailored solutions to help your business grow through
                <span className="text-purple-300 font-medium">
                  cutting-edge technology
                </span>
                .
              </p>

              <section className="flex flex-wrap justify-center gap-4 pt-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Custom Development
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  AI Solutions
                </span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  Consulting
                </span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                  Ready-Made Tools
                </span>
              </section>
            </section>
          </header>
        </section>
      </section>

      <section className="w-full">
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </section>

      <CallToAction />
    </main>
  );
};

export default ServicesPage;
