import { useNavigate } from "react-router-dom";

function WorkerCard({ worker }) {
  const navigate = useNavigate();

  // ================= CALCULATE AVERAGE RATING =================
  const averageRating =
    worker.reviewCount > 0
      ? worker.averageRating
      : "No ratings";

  // ================= LOGIN & ROLE CHECK (UPDATED) =================
  const handleViewProfile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    // 🔴 Guest
    if (!user) {
      alert("Please login or register to view full worker profile.");
      navigate("/login");
      return;
    }

    // 🟢 User or Admin
    if (user.role === "user" || user.role === "admin") {
      navigate(`/worker/${worker._id}`);
      return;
    }

    // ❌ Worker
    alert("You are not allowed to view this profile.");
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex gap-6 border border-gray-100">

      {/* ================= PROFILE IMAGE ================= */}
      <img
        src={
          worker.profileImage
            ? `http://localhost:5000/${worker.profileImage}`
            : "https://via.placeholder.com/150"
        }
        alt="worker"
        className="w-32 h-32 rounded-xl object-cover border"
      />

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex flex-col justify-between">

        <div>
          {/* NAME */}
          <h3 className="text-xl font-bold text-white">
            {worker.name}
          </h3>

          {/* SERVICE */}
          <p className="text-emerald-600 font-semibold uppercase text-sm mt-1">
            {worker.service}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400 font-semibold">
              ⭐ {averageRating}
            </span>
            <span className="text-xs text-slate-200">
              ({worker.reviewCount} reviews)
            </span>
          </div>

          {/* DETAILS */}
          <div className="mt-3 space-y-1 text-sm text-slate-200">
            <p>📍 {worker.location}</p>
            <p>🛠 Experience: {worker.experience} years</p>
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <button
          onClick={handleViewProfile}
          className="mt-5 w-fit bg-gradient-to-r from-teal-500 to-emerald-800 text-gray-200 px-6 py-2 rounded-lg font-medium hover:opacity-50 transition">
          
          View Profile →
        </button>
      </div>
    </div>
  );
}

export default WorkerCard;
