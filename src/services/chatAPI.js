import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

/* ================= TOKEN INTERCEPTOR ================= */
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= CHAT APIS ================= */

// send message
export const sendMessageAPI = (data) =>
  API.post("/chat", data);

// get chat history
export const getChatAPI = (userId) =>
  API.get(`/chat/history/${userId}`);

// worker: get users list
export const getWorkerUsersAPI = () =>
  API.get("/chat/worker/list");

// ✅ DELETE CHAT (THIS WAS MISSING)
export const deleteChatAPI = (userId) =>
  API.delete(`/chat/${userId}`);

//READ MESSAGE COUNT IN WORKER PROFILE - FOR WORKERS TO SEE IF ANY NEW MESSAGE
export const getWorkerUnreadCountAPI = () =>
  API.get("/chat/worker/unread/count");

//READ MESSAGE COUNT IN WORKER'S FULL PROFILE BY USER
export const getUserUnreadCountAPI = (workerId) =>
  API.get(`/chat/user/unread/count/${workerId}`);

export default API;
