import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold text-teal-400">
        FixItNow
      </h1>

      <ul className="flex gap-6 text-sm">
        <li>
          <Link to="/" className="hover:text-teal-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/workers" className="hover:text-teal-400 transition">
            Find Workers
          </Link>
        </li>
        <li className="border px-4 py-1 rounded hover:bg-teal-400 hover:text-black transition cursor-pointer">
          Login
        </li>
      </ul>

    </nav>
  )
}

export default Navbar
