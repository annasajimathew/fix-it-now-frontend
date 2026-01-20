import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {FaUserEdit, FaStar, FaComments, FaClock, FaCheckCircle, FaInfoCircle} from "react-icons/fa";
import { getWorkerUnreadCountAPI } from "../../services/chatAPI";


const WorkerDashboard = () => {
  const [approved, setApproved] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setApproved(storedUser.isApproved === true);
    }
  }, []);

  useEffect(() => {
  if (user?.role === "worker") {
    getWorkerUnreadCountAPI().then((res) => {
      setUnreadCount(res.data.unreadCount);
    });
  }
}, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 to-slate-800 p-6 text-gray-200">

      {/* ================= GREETING ================= */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 p-8 rounded-2xl shadow-xl mb-8 border border-slate-800 flex items-center gap-6">
        
        {/* PROFILE IMAGE */}
        <img
          src={
            user?.profileImage
              ? `http://localhost:5000/${user.profileImage}`
              : "https://via.placeholder.com/80"
          }
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Manage your profile, track approval status, view reviews, and
            communicate with customers. All from one place.
          </p>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div
        className={`flex items-center gap-4 p-5 rounded-xl border mb-10 ${
          approved
            ? "bg-emerald-500/30 border-emerald-500 text-green-400"
            : "bg-yellow-900/20 border-yellow-500 text-yellow-300"
        }`}
      >
        {approved ? (
          <FaCheckCircle className="text-3xl" />
        ) : (
          <FaClock className="text-3xl" />
        )}

        <div>
          <h3 className="font-semibold text-lg">
            {approved ? "Account Approved" : "Approval Pending"}
          </h3>
          <p className="text-sm text-gray-300">
            {approved
              ? "You are now visible to users and can receive service requests."
              : "Your profile is under admin review. Please wait for approval."}
          </p>
        </div>
      </div>

      {/* ================= ACTION CARDS (ONLY IF APPROVED) ================= */}
      {approved && (
        <>
          <div className="grid md:grid-cols-3 gap-6">

            {/* PROFILE */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-xl transition border border-slate-800">
              <FaUserEdit className="text-3xl text-emerald-400 mb-4" />
              <h2 className="font-semibold text-lg mb-2 text-white">
                Profile Management
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Update your skills, experience, and professional details.
              </p>

              <Link
                to="/worker/profile"
                className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm"
              >
                Manage Profile
              </Link>
            </div>

            {/* REVIEWS */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-xl transition border border-slate-800">
              <FaStar className="text-3xl text-yellow-400 mb-4" />
              <h2 className="font-semibold text-lg mb-2 text-white">
                Reviews & Ratings
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                See what customers think about your service.
              </p>

              <Link
                to="/worker/reviews"
                className="inline-block bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition text-sm"
              >
                View Reviews
              </Link>
            </div>

            {/* CHAT */}
            <div className="bg-slate-900 border-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition border">
              <div className="relative inline-block mb-4">
                <FaComments className="text-3xl text-teal-400" />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>

              <h2 className="font-semibold text-lg mb-2 text-white">
                Chat with Users
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                Discuss job details and confirm services.
              </p>

              <Link
                to="/worker/chat"
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition text-sm"
              >
                Open Chat
              </Link>
            </div>
          </div>

          {/* ================= INFO ================= */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl shadow border border-slate-800">
              <h2 className="text-xl font-bold mb-3 text-white">
                Tips to Get More Jobs
              </h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
                <li>Complete your profile fully</li>
                <li>Respond quickly to chat messages</li>
                <li>Maintain good customer ratings</li>
                <li>Keep your service details updated</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <FaInfoCircle className="text-emerald-400 text-xl" />
                <h2 className="text-xl font-bold text-white">
                  How FixItNow Works
                </h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                FixItNow connects skilled professionals with nearby customers.
                Approved workers appear in search results and can communicate
                directly with users through chat.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkerDashboard;
