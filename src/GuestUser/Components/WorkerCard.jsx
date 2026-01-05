import { useNavigate } from "react-router-dom";

function WorkerCard({ worker }) {
  const navigate = useNavigate();

  // ================= CALCULATE AVERAGE RATING =================
  const averageRating =
    worker.reviews && worker.reviews.length > 0
      ? (
          worker.reviews.reduce((sum, r) => sum + r.rating, 0) /
          worker.reviews.length
        ).toFixed(1)
      : "No ratings";

  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-6">
      <img
        src={
          worker.profileImage
            ? `http://localhost:5000/${worker.profileImage}`
            : "https://via.placeholder.com/150"
        }
        alt="worker"
        className="w-32 h-32 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold">{worker.name}</h3>

        {/* ================= SERVICE ================= */}
        <p className="text-green-600 font-semibold">
          {worker.service}
        </p>

        {/* no of reviews */}
        <p className="text-xs text-gray-500">({worker.reviewCount} reviews)</p>


        <p className="text-sm text-gray-600">
          📍 {worker.location}
        </p>

        <p className="text-sm">
          Experience: {worker.experience} years
        </p>

        <button
          onClick={() => navigate(`/worker/${worker._id}`)}
          className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default WorkerCard;
