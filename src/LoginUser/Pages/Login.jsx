import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FiMail, FiLock } from "react-icons/fi";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const tempParticles = [];
    for (let i = 0; i < 50; i++) {
      tempParticles.push({
        id: i,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
      });
    }
    setParticles(tempParticles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { user, token } = response.data;

      // Save to context + localStorage
      login(user, token);
      localStorage.setItem("role", user.role);

      toast.success("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "worker") {
        navigate("/worker");
      } else {
        navigate("/user");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-teal-600 to-emerald-400 rounded-full opacity-30 animate-blob top-[-10%] left-[-10%]"></div>
      <div className="absolute w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-30 animate-blob animation-delay-2000 bottom-[-10%] right-[-10%]"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-teal-500 to-emerald-300 rounded-full opacity-20 animate-blob animation-delay-4000 top-[30%] right-[-15%]"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-20 animate-blob animation-delay-6000 bottom-[20%] left-[-10%]"></div>

      {/* Particle background */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/20 rounded-full animate-bounce"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
          }}
        ></div>
      ))}

      {/* Login card */}
      <div className="relative max-w-md w-full bg-gray-800/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center text-white mb-10">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 text-white border border-white/20 focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 text-white border border-white/20 focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/register/user" className="text-emerald-400">
            Register
          </Link>
        </div>

        <div className="mt-3 text-center text-sm">
          <Link to="/forgot-password" className="text-red-400">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
