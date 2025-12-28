import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiBriefcase } from "react-icons/fi";

function RegisterWorker() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");
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
    if (!name || !email || !password || !service) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "worker",
        service,
      });
      setLoading(false);
      toast.success("Registered successfully! Wait for approval.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
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

      {/* Register Card */}
      <div className="relative max-w-md w-full bg-gray-800/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-gray-700  transition-transform duration-500 overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-10 animate-pulse">
          Register Worker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400 " size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-inner hover:shadow-lg transition duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 " size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-inner hover:shadow-lg transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 " size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-inner hover:shadow-lg transition duration-300"
            />
          </div>

          {/* Service / Profession */}
          <div className="relative">
            <FiBriefcase className="absolute top-3 left-3 text-gray-400 " size={20} />
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. Plumber, Electrician"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-inner hover:shadow-lg transition duration-300"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:text-emerald-200 font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Extra styles for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
}

export default RegisterWorker;
