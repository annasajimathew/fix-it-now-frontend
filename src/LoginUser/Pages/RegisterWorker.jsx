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
  FiUpload,
} from "react-icons/fi";

/* ================= PROFESSION LIST ================= */
const PROFESSIONS = [
  "AC Technician",
  "Carpenter",
  "Cleaner",
  "Cook",
  "Electrician",
  "Gardener",
  "Home Tutor",
  "Mason",
  "Mechanic",
  "Painter",
  "Plumber",
  "Roofer",
  "Tailor",
  "Welder",
];

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

  /* ================= PARTICLES ================= */
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
      formData.append(
        "languages",
        JSON.stringify(languages.split(",").map((l) => l.trim()))
      );
      formData.append("education", education);
      formData.append("profileImage", profileImage);
      formData.append("idProof", idProof);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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

      {/* ===== FLOATING BLOBS ===== */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-teal-600 to-emerald-400 rounded-full opacity-30 animate-blob top-[-10%] left-[-10%]" />
      <div className="absolute w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-30 animate-blob animation-delay-2000 bottom-[-10%] right-[-10%]" />
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-teal-500 to-emerald-300 rounded-full opacity-20 animate-blob animation-delay-4000 top-[30%] right-[-15%]" />
      <div className="absolute w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-20 animate-blob animation-delay-6000 bottom-[20%] left-[-10%]" />

      {/* ===== PARTICLES ===== */}
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

      {/* ===== CARD ===== */}
      <div className="relative max-w-md w-full bg-gray-800/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-gray-700">

        <h2 className="text-4xl font-extrabold text-center text-white mb-10 animate-pulse">
          Register Worker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input icon={FiUser} value={name} setValue={setName} placeholder="Full Name" />
          <Input icon={FiMail} value={email} setValue={setEmail} placeholder="Email" type="email" />
          <Input icon={FiLock} value={password} setValue={setPassword} placeholder="Password" type="password" />

          {/* ===== PROFESSION DROPDOWN (ONLY CHANGE) ===== */}
          <div className="relative">
            <FiBriefcase className="absolute top-3 left-3 text-gray-400" size={20} />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
            >
              <option value="">Select Profession</option>
              {PROFESSIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <Input icon={FiPhone} value={phone} setValue={setPhone} placeholder="Phone Number" />
          <Input icon={FiMapPin} value={location} setValue={setLocation} placeholder="Location / City" />
          <Input value={experience} setValue={setExperience} placeholder="Experience (years)" type="number" />
          <Input value={languages} setValue={setLanguages} placeholder="Languages (English, Malayalam)" />
          <Input icon={FiBook} value={education} setValue={setEducation} placeholder="Education / Certification" />

          <FileInput label="Profile Image" accept="image/*" setFile={setProfileImage} />
          <FileInput label="ID Proof (max 10MB)" accept="image/*,application/pdf" setFile={setIdProof} />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-200">
            Login
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
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

/* ================= INPUT ================= */
const Input = ({ icon: Icon, value, setValue, placeholder, type = "text" }) => (
  <div className="relative">
    {Icon && <Icon className="absolute top-3 left-3 text-gray-400" size={20} />}
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-gray-900 text-white focus:ring-2 focus:ring-emerald-400"
    />
  </div>
);

/* ================= FILE INPUT ================= */
const FileInput = ({ label, accept, setFile }) => (
  <div>
    <label className="text-gray-300 text-sm mb-1 block">{label}</label>
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-white/20 cursor-pointer hover:border-emerald-400">
      <FiUpload className="text-gray-400" />
      <span className="text-sm text-gray-400 upload-text">Choose a file</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          setFile(e.target.files[0]);
          e.target.closest("label").querySelector(".upload-text").textContent = "File Uploaded ✔";
        }}
      />
    </label>
  </div>
);

export default RegisterWorker;
