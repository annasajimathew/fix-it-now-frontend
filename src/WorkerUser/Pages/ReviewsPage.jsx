import { useEffect, useState } from "react";
import { getWorkerReviewsAPI } from "../../services/reviewAPI";
import ReviewList from "../Components/ReviewList";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.isApproved) {
      getWorkerReviewsAPI()
        .then((res) => setReviews(res.data))
        .catch(() => setReviews([]));
    }
  }, [user]);

  // ❌ Not approved → block page actions
  if (!user?.isApproved) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
        <p>Your account must be approved to view reviews.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-10 text-slate-200">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <p className="text-slate-400">
          No reviews yet. Complete more jobs to receive reviews.
        </p>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
}

export default ReviewsPage;
