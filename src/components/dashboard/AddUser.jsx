import { useState } from "react";
import axios from "axios";

export default function AddMemberForm() {
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Name: fullName,
      Email,
      Password,
      Role,
      phoneNumber: phone,
    };

    try {
      const response = await axios.post(
        "https://gutenberg-server-production.up.railway.app/api/auth/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ تم إنشاء المستخدم بنجاح");
      console.log("تم الإرسال:", response.data);

      // إفراغ الحقول
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("");
      setPhone("");
    } catch (error) {
      console.error(
        "❌ فشل في إنشاء المستخدم:",
        error.response?.data || error.message
      );
      setMessage("❌ فشل في إنشاء المستخدم");
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-16 px-4">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-[#1C4C78]">
          Add New Member
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Fill in the form below to create a new member account
        </p>
      </header>

      <form
        className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-5 sm:p-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C4C78]"
            placeholder="Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C4C78]"
            placeholder="name@example.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C4C78]"
            placeholder="********"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C4C78]"
            value={Role}
            onChange={() => setRole(1)}
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C4C78]"
            placeholder="0590000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <footer>
          <button
            type="submit"
            className="w-full bg-[#1C4C78] hover:bg-[#153a5e] text-white font-medium py-2 rounded-md transition"
          >
            Add Member
          </button>
        </footer>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </form>
    </section>
  );
}
