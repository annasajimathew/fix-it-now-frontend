import API from "./api";

// User adds review
export const addReviewAPI = (data) => {
  return API.post("/reviews", data);
};

// Worker gets own reviews
export const getWorkerReviewsAPI = () => {
  return API.get("/reviews/worker");
};

// Admin gets all reviews
export const getAllReviewsAPI = () => {
  return API.get("/reviews");
};
