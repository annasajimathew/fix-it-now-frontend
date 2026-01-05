import { useState } from "react";
import { toast } from "react-toastify";
import { addReview } from "../../services/reviewAPI";

function ReviewForm({ workerId, refresh }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview(workerId, { rating, comment });
      toast.success("Review submitted");
      setComment("");
      refresh();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Add Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        {[5,4,3,2,1].map(n => (
          <option key={n} value={n}>{n} Star</option>
        ))}
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review"
        className="w-full p-2 border rounded mb-2"
      />

      <button className="bg-emerald-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
