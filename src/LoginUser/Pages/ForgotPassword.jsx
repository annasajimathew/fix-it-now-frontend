import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-300 mb-6">
          Password recovery will be added in future versions.
        </p>
        <Link to="/login" className="text-emerald-400">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
