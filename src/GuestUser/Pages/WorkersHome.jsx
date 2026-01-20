import { Link } from "react-router-dom"
import {
  FaTools,
  FaBolt,
  FaSnowflake,
  FaPaintBrush,
  FaUserTie,
} from "react-icons/fa"

function WorkersHome() {
  const professions = [
    { name: "AC Technician", icon: <FaSnowflake className="text-emerald-400 w-6 h-6" /> },
    { name: "Carpenter", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
    { name: "Cleaner", icon: <FaUserTie className="text-emerald-400 w-6 h-6" /> },
    { name: "Cook", icon: <FaUserTie className="text-emerald-400 w-6 h-6" /> },
    { name: "Electrician", icon: <FaBolt className="text-emerald-400 w-6 h-6" /> },
    { name: "Gardener", icon: <FaUserTie className="text-emerald-400 w-6 h-6" /> },
    { name: "Home Tutor", icon: <FaUserTie className="text-emerald-400 w-6 h-6" /> },
    { name: "Mason", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
    { name: "Mechanic", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
    { name: "Painter", icon: <FaPaintBrush className="text-emerald-400 w-6 h-6" /> },
    { name: "Plumber", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
    { name: "Roofer", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
    { name: "Tailor", icon: <FaUserTie className="text-emerald-400 w-6 h-6" /> },
    { name: "Welder", icon: <FaTools className="text-emerald-400 w-6 h-6" /> },
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-gray-900 px-6 py-24">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-3">
          CHOOSE A SERVICE
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Select a profession to find verified and trusted professionals near you.
        </p>
      </div>

      {/* ===== SERVICE GRID ===== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {professions.map((prof, idx) => (
          <Link
            key={idx}
            to={`/workers/${prof.name}`}
            className="group bg-gray-800 border border-gray-500 rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-emerald-500/20 hover:border-emerald-500 transition-all duration-300"
          >
            <div className="bg-emerald-500/10 p-3 rounded-xl group-hover:bg-emerald-500/20 transition">
              {prof.icon}
            </div>

            <span className="font-semibold text-gray-200 group-hover:text-white transition">
              {prof.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default WorkersHome
