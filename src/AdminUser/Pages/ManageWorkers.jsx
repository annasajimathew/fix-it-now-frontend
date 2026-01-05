import { useEffect, useState } from "react";
import { getAllWorkersAPI, approveWorkerAPI } from "../../services/workerAPI";
import { toast } from "react-toastify";
import WorkerApprovalCard from "../Components/WorkerApprovalCard";

function ManageWorkers() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const res = await getAllWorkersAPI();
    setWorkers(res.data);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const approveWorker = async (id) => {
    await approveWorkerAPI(id);
    toast.success("Worker approved");
    fetchWorkers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Workers</h2>

      <div className="space-y-4">
        {workers.map((worker) => (
          <WorkerApprovalCard
            key={worker._id}
            worker={worker}
            onApprove={approveWorker}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageWorkers;
