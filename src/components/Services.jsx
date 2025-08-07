import React from "react";
import { FaCode, FaCog, FaBrain, FaDesktop } from "react-icons/fa";

const ServicesPreview = () => {
  const services = [
    {
      icon: FaCode,
      title: "Custom Software",
      description: "Tailored digital solutions for your needs.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: FaCog,
      title: "Ready-Made Tools",
      description: "Off-the-shelf products to boost productivity.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
    },
    {
      icon: FaBrain,
      title: "AI Integration",
      description: "Enhance systems with artificial intelligence.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
      icon: FaDesktop,
      title: "System Consultation",
      description: "Expert advice on IT infrastructure.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 hover:bg-cyan-100",
    },
  ];

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
          {services.map((service, index) => (
            <article
              key={index}
              className={`group ${service.bgColor} p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100 flex-1 min-w-[280px] max-w-[320px] flex flex-col`}
            >
              <header className="text-center flex flex-col items-center space-y-6 flex-1">
                <figure
                  className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                >
                  <service.icon className="text-white text-3xl" />
                </figure>

                <hgroup className="flex flex-col space-y-3 flex-1 justify-center">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </hgroup>
              </header>
            </article>
          ))}
        </section>
      </main>
    </section>
  );
};

export default ServicesPreview;
