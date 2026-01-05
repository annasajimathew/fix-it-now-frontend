import API from "./api";

// Admin - get all workers
export const getAllWorkersAPI = () => {
  return API.get("/admin/workers");
};

// Admin - approve worker
export const approveWorkerAPI = (id) => {
  return API.put(`/admin/approve-worker/${id}`);
};
