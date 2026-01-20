import { Link, useNavigate } from "react-router-dom";
import {
  FaUserClock,
  FaUserCheck,
  FaShieldAlt,
  FaArrowRight,
  FaCogs,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const storedAdmin = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(
    storedAdmin?.profileImage
      ? `http://localhost:5000${storedAdmin.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/295/295128.png"
  );

  /* ================= PASSWORD MATCH VALIDATION ================= */
  useEffect(() => {
    if (!newPassword && !confirmPassword) {
      setPasswordMismatch(false);
    } else {
      setPasswordMismatch(newPassword !== confirmPassword);
    }
  }, [newPassword, confirmPassword]);

  /* ================= UPDATE ADMIN PROFILE ================= */
  const updateProfileHandler = async () => {
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      // update profile image
      if (profileImage) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);

        await axios.put(
          "http://localhost:5000/api/admin/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // update password
      if (newPassword && confirmPassword) {
        await axios.put(
          "http://localhost:5000/api/admin/password",
          { newPassword, confirmPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Update successful. Please login again.");

      setTimeout(() => {
        sessionStorage.clear();
        navigate("/login");
      }, 2000);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-teal-800 to-slate-800 text-gray-200">

      {/* ================= MARQUEE ================= */}
      <div className="bg-gradient-to-r from-slate-700 via-emerald-700 to-teal-800 text-white rounded-xl mb-6 overflow-hidden shadow-xl border border-emerald-400/30">
        <marquee className="py-3 text-sm md:text-base font-medium">
          🛡 Welcome Admin! Review worker requests, approve verified professionals,
          manage users, and maintain platform security and trust.
        </marquee>
      </div>

      {/* ================= ADMIN PROFILE HEADER ================= */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-2xl p-6 mb-10 shadow-lg border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <img
              src={previewImage}
              alt="admin"
              className="w-20 h-20 rounded-full border-4 border-emerald-400 object-cover"
            />

            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-1">
              Central control panel for FixItNow operations.
            </p>
            <p className="text-gray-400 max-w-3xl leading-relaxed mt-2">
              As an administrator, you are responsible for verifying worker
              credentials, approving skilled professionals, monitoring user
              activity, and ensuring platform reliability, trust, and safety.
            </p>
          </div>
        </div>
      </div>

      {/* ================= WHAT YOU CAN DO ================= */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
          <FaCogs className="text-emerald-400" />
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <FaUserClock className="text-3xl text-yellow-400 mb-4" />
            <h3 className="font-semibold text-lg text-white mb-2">
              Review Worker Applications
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Inspect newly registered workers, verify submitted documents,
              review experience and service details, and decide whether they
              should be allowed to operate on the FixItNow platform.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <FaUserCheck className="text-3xl text-emerald-400 mb-4" />
            <h3 className="font-semibold text-lg text-white mb-2">
              Approve Skilled Professionals
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Approve only genuine and skilled workers so that users can
              confidently book services, ensuring quality and professionalism
              across all categories.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <FaShieldAlt className="text-3xl text-teal-400 mb-4" />
            <h3 className="font-semibold text-lg text-white mb-2">
              Maintain Platform Trust
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Monitor suspicious activity, remove fake accounts, handle misuse,
              and maintain a secure environment for both service providers and
              customers.
            </p>
          </div>

        </div>
      </div>

      {/* ================= WORKER MANAGEMENT ================= */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-10 shadow-2xl border-2 border-emerald-400">
        <div className="flex justify-between items-center text-white">
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Worker Management
            </h3>
            <p className="text-gray-300 max-w-xl leading-relaxed">
              View all registered workers, check approval status, manage
              professional details, and take administrative actions when
              required to maintain service quality.
            </p>
          </div>

          <Link
            to="/admin/workers"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition"
          >
            Manage Workers
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Edit Admin Profile
              </h2>
              <FaTimes
                onClick={() => setShowEdit(false)}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
            </div>

            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center mb-4">
              <label className="cursor-pointer">
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-28 h-28 rounded-full border-4 border-emerald-400 object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setProfileImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Click image to change profile picture
              </p>
            </div>

            {/* NAME */}
            <input
              value="Admin"
              disabled
              className="w-full mb-3 px-4 py-2 rounded bg-slate-700 border border-slate-600 text-gray-400"
            />

            {/* EMAIL */}
            <input
              value={storedAdmin?.email}
              disabled
              className="w-full mb-3 px-4 py-2 rounded bg-slate-700 border border-slate-600 text-gray-400"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />

            {passwordMismatch && (
              <p className="text-xs text-red-400 mb-3">
                Confirm Password doesn’t match New Password
              </p>
            )}

            <button
              onClick={updateProfileHandler}
              disabled={passwordMismatch}
              className={`w-full bg-gradient-to-r from-teal-400 to-emerald-600 text-black font-bold py-2 rounded-lg
                ${
                  passwordMismatch
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-90 transition"
                }`}
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
