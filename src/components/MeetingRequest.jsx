import { useState } from "react";

export default function MeetingRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    topic: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getPreferredDateTime = () => {
    if (!formData.preferredDate || !formData.preferredTime) return null;
    return new Date(
      formData.preferredDate + "T" + formData.preferredTime
    ).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      topic: formData.topic,
      preferredDate: getPreferredDateTime(),
      meetingStatus: 1,
      responseDate: null,
    };

    try {
      const response = await fetch(
        "https://gutenberg-server-production.up.railway.app/api/MeetingRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Meeting request sent!");
        setFormData({
          name: "",
          email: "",
          preferredDate: "",
          preferredTime: "",
          topic: "",
        });
      } else {
        alert("Failed to send meeting request.");
      }
    } catch (error) {
      console.error("Error sending meeting request:", error);
      alert("Error sending meeting request.");
    }
  };

  return (
    <section className="flex justify-center items-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Meeting Request Form
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Date
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Time
          </label>
          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Purpose
          </label>
          <textarea
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Briefly describe the purpose"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Send Request
        </button>
      </form>
    </section>
  );
}
