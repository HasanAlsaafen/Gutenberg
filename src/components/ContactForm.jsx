import axios from "axios";
import React, { useState, useEffect } from "react";

function ContactForm() {
  const [services, setServices] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  }
  useEffect(() => {
    axios
      .get("https://gutenberg-server-production.up.railway.app/api/Services")
      .then((res) => {
        setServices(res.data);
      });
  }, []);
  return (
    <main
      id="contact"
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
    >
      <section className="w-full max-w-4xl">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Contact Us
          </h1>
        </header>

        <form
          action="https://formspree.io/f/xqalgjyl"
          method="POST"
          className="bg-white p-8 rounded-lg shadow-md"
          aria-label="Contact form"
        >
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <legend className="sr-only">Contact Information</legend>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Name (required)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                placeholder="Your name*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email address (required)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Mail*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                placeholder="Your phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Services (required)
              </label>
              <select
                id="service"
                name="service"
                value={data.service}
                onChange={handleChange}
                required
                aria-required="true"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option
                    key={service.serviceId}
                    value={String(service.serviceId)}
                  >
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={data.message}
                onChange={handleChange}
                rows="5"
                placeholder="Type message*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              ></textarea>
            </div>
          </fieldset>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send message
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ContactForm;
