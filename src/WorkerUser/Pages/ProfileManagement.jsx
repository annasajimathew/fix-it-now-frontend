import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaLanguage,
  FaGraduationCap,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileManagement() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || "",
    experience: user.experience || "",
    education: user.education || "",
    languages: user.languages?.join(",") || "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Password validation
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      // 1️⃣ Update profile
      await axios.put(
        "http://localhost:5000/api/workers/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2️⃣ Update password (optional)
      if (newPassword && confirmPassword) {
        await axios.put(
          "http://localhost:5000/api/users/password",
          { newPassword, confirmPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Password updated. Please login again.");

        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 2000);

        return;
      }

      toast.success("Profile updated successfully");

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 to-slate-900 p-6 text-slate-200">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-800">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-1">
            Profile Management
          </h2>
          <p className="text-slate-400 text-sm">
            Update your professional details and password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME (LOCKED) */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-slate-500" />
              <input
                value={formData.name}
                disabled
                className="w-full pl-10 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* LOCATION (LOCKED) */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-slate-500" />
              <input
                value={formData.location}
                disabled
                className="w-full pl-10 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Experience</label>
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          {/* LANGUAGES */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Languages</label>
            <input
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          {/* EDUCATION */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Education</label>
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-emerald-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 py-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-emerald-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordMismatch(
                    newPassword && e.target.value !== newPassword
                  );
                }}
                className="w-full pl-10 py-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>
            {passwordMismatch && (
              <p className="text-xs text-red-400 mt-1">
                Confirm Password Doesn't match New Password
              </p>
            )}
          </div>

          {/* SAVE */}
          <button
            type="submit"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
           UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileManagement;
