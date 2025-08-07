import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextContext.jsx";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    axios
      .get("/api/User")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // Optionally handle error
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    // Find user by email and password only
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      login(found); // set user in context
      if (found.type === "admin") {
        navigate("/dashboard");
      } else {
        alert(`Login successful as ${found.type || "user"}`);
        // You can redirect normal users elsewhere if needed
      }
    } else {
      setLoginError("Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-[#1e293b] flex items-center justify-center px-4">
      <section className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <header>
          <h1 className="text-xl font-semibold text-center text-[#1e293b] mb-2">
            Admin Login
          </h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e293b]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e293b]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e293b] text-white py-2 rounded-md hover:bg-[#0f172a] transition duration-200"
          >
            Login
          </button>
          {loginError && (
            <p className="text-red-600 text-sm text-center mt-2">
              {loginError}
            </p>
          )}
        </form>

        <p className="text-sm text-right text-gray-500 hover:underline cursor-pointer mt-4">
          Forgot password?
        </p>
      </section>
    </main>
  );
}
