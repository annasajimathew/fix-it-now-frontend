import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-emerald-400 tracking-wide"
        >
          FixItNow
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            to="/"
            className="hover:text-emerald-400 transition"
          >
            Home
          </Link>

          <Link
            to="/workers"
            className="hover:text-emerald-400 transition"
          >
            Find Workers
          </Link>

          <Link
            to="/login"
            className="hover:text-emerald-400 transition"
          >
            Login
          </Link>

          <Link
            to="/register/worker"
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
          >
            Join as Worker
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
