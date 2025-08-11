import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      alert(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gutenberg-server-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        alert("Login failed: invalid email or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("Name", email);
      const decoded = parseJwt(data.token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      localStorage.setItem("Role", role);

      nav("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-[#1e293b] flex items-center justify-center px-4">
      <section className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <header>
          <h1 className="text-xl font-semibold text-center text-[#1e293b] mb-2">
            Member Login
          </h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Please enter your information to continue.
          </p>
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
              placeholder="Member@example.com"
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
        </form>

        <p className="text-sm text-right text-gray-500 hover:underline cursor-pointer mt-4">
          Forgot password?
        </p>
      </section>
    </main>
  );
}
