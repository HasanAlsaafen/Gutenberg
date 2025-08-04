import React from "react";
import {
  FaHeadset,
  FaQuestionCircle,
  FaBook,
  FaEnvelope,
} from "react-icons/fa";

const Support = () => {
  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <FaHeadset className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">Support</h1>
            <p className="text-gray-600">
              Get help and support for your platform
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaQuestionCircle className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
          </header>
          <p className="text-gray-600">
            Find answers to commonly asked questions
          </p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaBook className="text-green-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">
              Documentation
            </h3>
          </header>
          <p className="text-gray-600">
            Browse comprehensive guides and tutorials
          </p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaEnvelope className="text-purple-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Support
            </h3>
          </header>
          <p className="text-gray-600">Get in touch with our support team</p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaHeadset className="text-orange-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
          </header>
          <p className="text-gray-600">
            Chat with support representatives in real-time
          </p>
        </article>
      </section>
    </main>
  );
};

export default Support;
