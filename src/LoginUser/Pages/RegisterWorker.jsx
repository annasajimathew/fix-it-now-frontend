import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiPhone,
  FiMapPin,
  FiBook,
} from "react-icons/fi";

function RegisterWorker() {
  const navigate = useNavigate();

  // ================= BASIC =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");

  // ================= PROFESSIONAL =================
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");
  const [education, setEducation] = useState("");

  // ================= FILES =================
  const [profileImage, setProfileImage] = useState(null);
  const [idProof, setIdProof] = useState(null);

  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // ================= PARTICLES =================
  useEffect(() => {
    const tempParticles = [];
    for (let i = 0; i < 40; i++) {
      tempParticles.push({
        id: i,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 6 + 4,
      });
    }
    setParticles(tempParticles);
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !service ||
      !phone ||
      !location ||
      !experience ||
      !languages ||
      !education ||
      !profileImage ||
      !idProof
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (idProof.size > 10 * 1024 * 1024) {
      toast.error("ID Proof must be less than 10MB");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "worker");
      formData.append("service", service);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("experience", experience);
      formData.append("languages", JSON.stringify(
        languages.split(",").map(l => l.trim())
      ));
      formData.append("education", education);
      formData.append("profileImage", profileImage);
      formData.append("idProof", idProof);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Registered successfully! Await admin approval.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Particles */}
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
        />
      ))}

      {/* Card */}
      <div className="relative max-w-md w-full bg-gray-800/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Register Worker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input icon={FiUser} value={name} setValue={setName} placeholder="Full Name" />
          <Input icon={FiMail} value={email} setValue={setEmail} placeholder="Email" type="email" />
          <Input icon={FiLock} value={password} setValue={setPassword} placeholder="Password" type="password" />
          <Input icon={FiPhone} value={phone} setValue={setPhone} placeholder="Phone Number" />
          <Input icon={FiBriefcase} value={service} setValue={setService} placeholder="Profession (Plumber)" />
          <Input icon={FiMapPin} value={location} setValue={setLocation} placeholder="Location / City" />
          <Input value={experience} setValue={setExperience} placeholder="Experience (years)" type="number" />
          <Input value={languages} setValue={setLanguages} placeholder="Languages (English, Malayalam)" />
          <Input icon={FiBook} value={education} setValue={setEducation} placeholder="Education / Certification" />

          {/* Profile Image */}
          <div>
            <label className="text-gray-300 text-sm">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full text-white"
              required
            />
          </div>

          {/* ID Proof */}
          <div>
            <label className="text-gray-300 text-sm">
              ID Proof (Aadhaar / License – max 10MB)
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setIdProof(e.target.files[0])}
              className="w-full text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

// ================= INPUT COMPONENT =================
const Input = ({ icon: Icon, value, setValue, placeholder, type = "text" }) => (
  <div className="relative">
    {Icon && <Icon className="absolute top-3 left-3 text-gray-400" size={20} />}
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl bg-gray-900 text-white border border-white/20 focus:ring-2 focus:ring-emerald-400`}
    />
  </div>
);

export default RegisterWorker;
