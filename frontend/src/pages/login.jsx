import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
      px-4
    ">
      <div className="
        w-full max-w-md
        bg-white rounded-2xl shadow-2xl
        p-6 sm:p-8
      ">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yellow-500 text-white p-4 rounded-full mb-3">
            <FaLock size={22} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full mt-1 px-4 py-2 rounded-lg
                bg-gray-100 border
                focus:outline-none focus:ring-2 focus:ring-yellow-500
              "
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full mt-1 px-4 py-2 rounded-lg
                bg-gray-100 border
                focus:outline-none focus:ring-2 focus:ring-yellow-500
              "
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-yellow-500 text-white py-2 rounded-lg
              font-semibold hover:bg-yellow-600 transition
            "
          >
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 Delivery Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;
