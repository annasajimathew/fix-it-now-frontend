import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWorkers();
  }, []);

  // ================= FETCH WORKERS =================
  const fetchWorkers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/workers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkers(res.data);
    } catch (error) {
      toast.error("Failed to load workers");
    }
  };

  // ================= APPROVE WORKER =================
  const approveWorker = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/approve-worker/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Worker approved successfully");
      fetchWorkers();
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  // ================= DELETE WORKER =================
  const deleteWorker = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/worker/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Worker deleted successfully");
      fetchWorkers();
    } catch (error) {
      toast.error("Failed to delete worker");
    }
  };

  // ================= FILTER =================
  const pendingWorkers = workers.filter(
    (w) => w.role === "worker" && !w.isApproved
  );

  const approvedWorkers = workers.filter(
    (w) => w.role === "worker" && w.isApproved
  );

  // ================= WORKER CARD =================
  const renderWorkerCard = (worker, showApprove = false) => (
    <div
      key={worker._id}
      className="bg-white p-5 rounded-xl shadow mb-5 border"
    >
      <div className="flex gap-5">
        {/* Profile Image */}
        <img
          src={
            worker.profileImage
              ? `http://localhost:5000/${worker.profileImage}`
              : "https://via.placeholder.com/100"
          }
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        {/* Worker Details */}
        <div className="flex-1">
          <h3 className="text-lg font-bold">{worker.name}</h3>
          <p className="text-sm text-gray-600">{worker.service}</p>

          <p className="text-sm">📧 Email: {worker.email}</p>
          <p className="text-sm">📞 Phone: {worker.phone}</p>
          <p className="text-sm">📍 Location: {worker.location}</p>
          <p className="text-sm">
            🛠 Experience: {worker.experience} years
          </p>
          <p className="text-sm">
            🗣 Languages: {worker.languages?.join(", ")}
          </p>
          <p className="text-sm">🎓 Education: {worker.education}</p>

          {/* ID Proof */}
          {worker.idProof && (
            <a
              href={`http://localhost:5000/${worker.idProof}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 text-blue-600 underline text-sm"
            >
              View ID Proof
            </a>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-2">
          {showApprove && (
            <button
              onClick={() => approveWorker(worker._id)}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => deleteWorker(worker._id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <p
        className={`mt-3 font-medium ${
          worker.isApproved ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Status: {worker.isApproved ? "Approved" : "Pending"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ================= PENDING WORKERS ================= */}
      <h2 className="text-xl font-semibold mb-4 text-yellow-700">
        Pending Worker Approvals
      </h2>

      {pendingWorkers.length === 0 ? (
        <p className="text-gray-600 mb-6">
          No workers waiting for approval
        </p>
      ) : (
        pendingWorkers.map((worker) =>
          renderWorkerCard(worker, true)
        )
      )}

      {/* ================= APPROVED WORKERS ================= */}
      <h2 className="text-xl font-semibold mt-10 mb-4 text-green-700">
        Approved Workers
      </h2>

      {approvedWorkers.length === 0 ? (
        <p className="text-gray-600">No approved workers yet</p>
      ) : (
        approvedWorkers.map((worker) =>
          renderWorkerCard(worker, false)
        )
      )}
    </div>
  );
};

export default AdminDashboard;
