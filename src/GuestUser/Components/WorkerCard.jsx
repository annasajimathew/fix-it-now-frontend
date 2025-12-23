import { FaStar, FaMapMarkerAlt, FaUserTie } from "react-icons/fa"
import { Link } from "react-router-dom"

function WorkerCard({ worker }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex overflow-hidden border border-gray-100">

      {/* LEFT : PROFILE IMAGE */}
      <div className="w-1/3 bg-gray-100">
        <img
          src={worker.image}
          alt={worker.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT : DETAILS */}
      <div className="w-2/3 p-5 flex flex-col justify-between bg-slate-700">

        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaUserTie className="text-emerald-500" />
            {worker.name}
          </h3>

          <p className="text-sm text-yellow-100 mt-1">
            {worker.service}
          </p>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{worker.rating}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-emerald-500" />
              {worker.location}
            </div>
          </div>
        </div>

        <Link
          to={`/worker/${worker.id}`}
          className="mt-4 text-center bg-slate-900 text-white py-2 rounded-md font-medium hover:bg-emerald-900 transition"
        >
          View Profile
        </Link>
      </div>

    </div>
  )
}

export default WorkerCard
