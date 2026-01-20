import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white px-8 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-emerald-400">
          FixItNow
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* HOME - everyone */}
          <Link to="/" className="hover:text-emerald-400">
            Home
          </Link>

         
          {/* FIND / VIEW WORKERS */}
          {user?.role !== "worker" && (
            <Link to="/workers" className="hover:text-emerald-400">
              {user?.role === "admin" ? "View Workers" : "Find Workers"}
            </Link>
          )}


          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-emerald-400">
                Login
              </Link>

              <Link
                to="/register/worker"
                className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600 transition"
              >
                Join as Worker
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {user && (
            <>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="hover:text-emerald-400">
                  Admin Dashboard
                </Link>
              )}

              {user.role === "user" && (
                <Link to="/user/dashboard" className="hover:text-emerald-400">
                  User Dashboard
                </Link>
              )}

              {user.role === "worker" && (
                <Link to="/worker/dashboard" className="hover:text-emerald-400">
                  Worker Dashboard
                </Link>
              )}

              <button
  onClick={() => {
    logout();
    navigate("/login");
  }}
  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
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
