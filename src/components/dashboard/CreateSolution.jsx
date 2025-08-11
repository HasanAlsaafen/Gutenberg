import React, { useState } from "react";
import axios from "axios";

const CreateSolution = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    solutionType: "Custom",
    image: "",
  });
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://gutenberg-server-production.up.railway.app/api/Solution",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ تم إنشاء الحل بنجاح");
      setFormData({
        title: "",
        description: "",
        solutionType: "Custom",
        image: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ أثناء الإنشاء");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-600">إنشاء حل جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="عنوان الحل"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="وصف الحل"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="solutionType"
          value={formData.solutionType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="Custom">مخصص (Custom)</option>
          <option value="ReadyMade">جاهز (ReadyMade)</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          إنشاء
        </button>
      </form>
      {message && (
        <p className="mt-2 text-center text-green-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateSolution;
