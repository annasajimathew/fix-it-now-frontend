
import API from "./api";

export const getAllUsersAPI = () => {
  return API.get("/admin/users");
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};
