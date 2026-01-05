import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-emerald-400">
          FixItNow
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link to="/" className="hover:text-emerald-400">Home</Link>
          <Link to="/workers" className="hover:text-emerald-400">Find Workers</Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-emerald-400">Login</Link>
              <Link
                to="/register/worker"
                className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600"
              >
                Join as Worker
              </Link>
            </>
          )}

          {user && (
            <>
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              {user.role === "user" && <Link to="/user">Dashboard</Link>}
              {user.role === "worker" && <Link to="/worker">Dashboard</Link>}

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
