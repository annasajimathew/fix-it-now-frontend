import { Link } from "react-router-dom"
import { FaTools, FaBolt, FaSnowflake, FaPaintBrush, FaUserTie } from "react-icons/fa"

function WorkersHome() {
  const professions = [
    { name: "AC Technician", icon: <FaSnowflake className="text-emerald-500 w-6 h-6"/> },
    { name: "Carpenter", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
    { name: "Cleaner", icon: <FaUserTie className="text-emerald-500 w-6 h-6"/> },
    { name: "Cook", icon: <FaUserTie className="text-emerald-500 w-6 h-6"/> },
    { name: "Electrician", icon: <FaBolt className="text-emerald-500 w-6 h-6"/> },
    { name: "Gardener", icon: <FaUserTie className="text-emerald-500 w-6 h-6"/> },
    { name: "Home Tutor", icon: <FaUserTie className="text-emerald-500 w-6 h-6"/> },
    { name: "Mason", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
    { name: "Mechanic", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
    { name: "Painter", icon: <FaPaintBrush className="text-emerald-500 w-6 h-6"/> },
    { name: "Plumber", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
    { name: "Roofer", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
    { name: "Tailor", icon: <FaUserTie className="text-emerald-500 w-6 h-6"/> },
    { name: "Welder", icon: <FaTools className="text-emerald-500 w-6 h-6"/> },
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-20">
      <h2 className="text-3xl font-semibold text-slate-800 mb-10 text-center">
        Choose a Service
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {professions.map((prof, idx) => (
          <Link
            key={idx} to={`/workers/${prof.name}`} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex items-center gap-4 cursor-pointer">
            <div className="text-3xl">{prof.icon}</div>
            <span className="font-semibold text-slate-800">{prof.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default WorkersHome
