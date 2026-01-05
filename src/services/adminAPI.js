import API from "./api";

export const getAllWorkersAdmin = () => {
  return API.get("/admin/workers");
};

export const approveWorker = (id) => {
  return API.put(`/admin/approve-worker/${id}`);
};
