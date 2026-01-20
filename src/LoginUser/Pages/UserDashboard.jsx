import {
  FaSearch,
  FaUserCheck,
  FaComments,
  FaStar,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const UserDashboard = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(storedUser?.name || "");
  const [email] = useState(storedUser?.email || ""); // 🔒 fixed
  const [profileImage, setProfileImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(
    storedUser?.profileImage
      ? `http://localhost:5000${storedUser.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/5675/5675059.png"
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  /* ================= UPDATE PROFILE ================= */
  const updateProfileHandler = async () => {
    // 🔐 Password match validation
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // update profile (name + image)
      await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update password (optional)
      if (newPassword && confirmPassword) {
        await axios.put(
          "http://localhost:5000/api/users/password",
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-teal-800 to-slate-800 text-gray-200">

      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-2xl p-6 mb-10 shadow-lg border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={previewImage}
            alt="profile"
            className="w-20 h-20 rounded-full border-4 border-emerald-400 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {storedUser?.name} 👋
            </h1>
            <p className="text-gray-300 mt-1">
              Manage your profile and account settings.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-lg"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Edit Profile</h2>
              <FaTimes
                onClick={() => setShowEdit(false)}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
            </div>

            {/* Profile Image */}
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

            {/* Name  */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full mb-3 px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />

            {/* Email (fixed) */}
            <input
              type="email"
              value={email}
              disabled
              className="w-full mb-3 px-4 py-2 rounded bg-slate-700 border border-slate-600 cursor-not-allowed text-gray-400"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);

                if (newPassword && value !== newPassword) {
                  setPasswordMismatch(true);
                } else {
                  setPasswordMismatch(false);
                }
              }}
              className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />

            {passwordMismatch && (
              <p className="text-xs text-red-400 mb-3">
                Confirm Password doesn't match New Password
              </p>
            )}
           


            <button
              onClick={updateProfileHandler}
              disabled={passwordMismatch}
              className={`w-full cursor-pointer bg-gradient-to-r from-teal-400 to-emerald-600 text-black font-bold py-2 rounded-lg
                ${passwordMismatch ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 transition"}`}
            >
              Update Profile
            </button>
          </div>
        </div>
      )}

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
          <FaSearch className="text-3xl text-teal-400 mb-4" />
          <h3 className="font-semibold text-lg text-white mb-2">
            Browse Skilled Workers
          </h3>
          <p className="text-gray-400 text-sm">
            Search workers by profession and ratings.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
          <FaUserCheck className="text-3xl text-emerald-400 mb-4" />
          <h3 className="font-semibold text-lg text-white mb-2">
            View Profiles & Reviews
          </h3>
          <p className="text-gray-400 text-sm">
            Check real reviews before hiring.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
          <FaComments className="text-3xl text-sky-400 mb-4" />
          <h3 className="font-semibold text-lg text-white mb-2">
            Chat & Book Services
          </h3>
          <p className="text-gray-400 text-sm">
            Chat directly with professionals.
          </p>
        </div>
      </div>

      {/* ================= WHY FIXITNOW ================= */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-6 mb-12 border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-400" /> Why Use FixItNow?
        </h2>

        <ul className="grid md:grid-cols-2 gap-4 text-gray-400 text-sm">
          <li>✔ Verified and approved service professionals</li>
          <li>✔ Real customer ratings and reviews</li>
          <li>✔ Secure chat communication</li>
          <li>✔ Easy and fast service discovery</li>
          <li>✔ Transparent service selection</li>
          <li>✔ Saves time and effort</li>
        </ul>
      </div>

      {/* ================= ILLUSTRATION SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Everything You Need, In One Place
          </h2>
          <p className="text-gray-400 mb-4">
            FixItNow simplifies how you find and connect with skilled workers.
            Whether it's home repairs, maintenance, or technical services,
            everything is just a few clicks away.
          </p>
          <p className="text-gray-400 text-sm">
            Start by browsing workers, explore profiles, chat with professionals,
            and choose the best service that fits your needs.
          </p>
        </div>

        <div>
          <img
            width="900"
            src="https://thumbs.dreamstime.com/b/virtual-screen-business-intelligence-dashboard-analytics-big-data-technology-concept-129550149.jpg"
            alt="Service Illustration"
            className="rounded-xl shadow-lg border border-slate-800"
          />
        </div>
      </div>

      {/* ================= HOME BUTTON ================= */}
      <div className="flex justify-center mt-20">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-700 text-black font-bold border-2 border-white"
        >
          HOME
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
