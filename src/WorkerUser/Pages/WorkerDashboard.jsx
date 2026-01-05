import { useEffect, useState } from "react";

const WorkerDashboard = () => {
  const [approved, setApproved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setApproved(storedUser.isApproved === true);
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>

      {!approved ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          ⏳ Your account is waiting for admin approval.
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
          ✅ Your account is approved. You are now visible to users.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold mb-2">Manage Profile</h2>
          <p className="text-sm text-gray-600">
            Update your service details and profile information.
          </p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold mb-2">Reviews & Ratings</h2>
          <p className="text-sm text-gray-600">
            View feedback given by users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;

