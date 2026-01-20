import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex flex-col items-center justify-center text-center px-6">
      
      

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-white mb-4">
        Oops! Page Not Found
      </h1>

      {/* MESSAGE */}
      <p className="text-lg text-gray-300 mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* BACK HOME BUTTON */}
      <Link
        to="/"
        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
