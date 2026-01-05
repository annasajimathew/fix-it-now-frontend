import { useEffect, useState } from "react";
import { getWorkerReviews } from "../../services/reviewAPI";
import ReviewList from "../Components/ReviewList";

function ReviewsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      getWorkerReviews(user._id).then(res => setReviews(res.data));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default ReviewsPage;
