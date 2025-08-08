import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaCalendarAlt,
  FaArrowRight,
  FaUserTie,
} from "react-icons/fa";

const CallToAction = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/bookDemo");
  };
  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 to-gray-100 flex flex-col justify-center">
      <main className="container mx-auto px-6 lg:px-8 flex justify-center items-center">
        <article className="max-w-4xl w-full">
          <section className="flex flex-col lg:flex-row gap-12 items-center">
            <header className="flex flex-col space-y-8 flex-1">
              <hgroup className="flex flex-col space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight flex flex-col">
                  <span>Still not sure what you</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    need?
                  </span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Talk to our experts and get a solution tailored to your
                  business.
                </p>
              </hgroup>

              <section className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleClick}
                  className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-3"
                >
                  <FaCalendarAlt className="text-xl" />
                  <span>Book a Free Call</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </section>

              <aside className="flex items-center space-x-4 text-gray-500">
                <FaPhone className="text-purple-600" />
                <span className="text-sm">
                  No commitment • 30-minute consultation • Free of charge
                </span>
              </aside>
            </header>

            <aside className="flex justify-center lg:justify-end flex-1">
              <article className="w-72 h-72 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <FaUserTie className="text-white text-8xl" />
              </article>
            </aside>
          </section>
        </article>
      </main>
    </section>
  );
};

export default CallToAction;
