import React from "react";
import { FaArrowRight, FaDesktop } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></span>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_50%)]"></span>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <article className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center min-h-[80vh] lg:min-h-[70vh]">
          <header className="text-white flex flex-col space-y-6 lg:space-y-8 flex-1 items-center lg:items-start">
            <hgroup className="flex flex-col space-y-4 lg:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col">
                <span>Smart Software</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Solutions for
                </span>
                <span>Your Business</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg">
                Custom development & ready-made tools for B2B efficiency.
              </p>
            </hgroup>

            <nav className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-2">
                <span>Request a Demo</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </nav>
          </header>

          <aside className="flex justify-center items-center flex-1 w-full lg:justify-end">
            <figure className="flex justify-center items-center">
              <FaDesktop className="text-purple-400 text-8xl sm:text-9xl lg:text-[12rem] opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </figure>
          </aside>
        </article>
      </main>
    </section>
  );
};

export default HeroSection;
