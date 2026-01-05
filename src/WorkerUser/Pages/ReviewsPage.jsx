import { useEffect, useState } from "react";
import { getWorkerReviewsAPI } from "../../services/reviewAPI";
import ReviewList from "../Components/ReviewList";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getWorkerReviewsAPI().then((res) => setReviews(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default ReviewsPage;
