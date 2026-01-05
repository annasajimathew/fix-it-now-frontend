function WorkerApprovalCard({ worker }) {
  return (
    <div className="bg-white p-4 shadow rounded flex justify-between">
      <div>
        <h3 className="font-semibold">{worker.name}</h3>
        <p className="text-sm">{worker.service}</p>
      </div>
      <button className="bg-emerald-600 text-white px-3 py-1 rounded">
        Approve
      </button>
    </div>
  );
}

export default WorkerApprovalCard;
