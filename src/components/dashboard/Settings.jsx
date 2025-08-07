import React from "react";
import { FaCogs, FaUser, FaBell, FaShieldAlt } from "react-icons/fa";

const Settings = () => {
  return (
    <main>
      <header className="mb-8">
        <section className="flex items-center space-x-4 mb-4">
          <figure className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
            <FaCogs className="text-white text-xl" />
          </figure>
          <hgroup>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">
              Configure your dashboard preferences
            </p>
          </hgroup>
        </section>
      </header>

      <section className="flex flex-col md:flex-row gap-6">
        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaUser className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">
              Profile Settings
            </h3>
          </header>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaBell className="text-green-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
          </header>
          <p className="text-gray-600">
            Configure email and push notification settings
          </p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaShieldAlt className="text-red-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </header>
          <p className="text-gray-600">
            Manage passwords and security preferences
          </p>
        </article>

        <article className="bg-white rounded-xl p-6 shadow-lg flex-1">
          <header className="flex items-center space-x-3 mb-4">
            <FaCogs className="text-purple-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">
              System Settings
            </h3>
          </header>
          <p className="text-gray-600">
            Configure system-wide preferences and integrations
          </p>
        </article>
      </section>
    </main>
  );
};

export default Settings;
