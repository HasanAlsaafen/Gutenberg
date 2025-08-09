import React, { useState } from "react";
function ContactForm() {
  // استخدمت useState لتخزين بيانات الفورم باسم data
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // لما تتغير قيمة أي حقل
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h2>

        <form
          id="contact"
          action="https://formspree.io/f/xqalgjyl"
          method="POST"
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Name (required)
              </label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Your name*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email address (required)
              </label>
              <input
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Mail*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone (optional)
              </label>
              <input
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Your phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Services (required)
              </label>
              <select
                name="service"
                value={data.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Service</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="custom">Custom Software</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Your message
              </label>
              <textarea
                name="message"
                value={data.message}
                onChange={handleChange}
                rows="5"
                placeholder="Type message*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
