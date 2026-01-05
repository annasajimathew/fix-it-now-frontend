import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* ================= STAR RATING COMPONENT ================= */
const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${
            hover >= star || rating >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

function WorkerProfile() {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);

  // review form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // logged in user
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWorker();
    fetchReviews();
  }, [id]);

  // ================= FETCH WORKER =================
  const fetchWorker = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/workers/profile/${id}`
    );
    setWorker(res.data);
  };

  // ================= FETCH REVIEWS =================
  const fetchReviews = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/reviews/${id}`
    );
    setReviews(res.data);
  };

  // ================= SUBMIT REVIEW =================
  const submitReview = async () => {
    if (!rating || !comment) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review added successfully");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add review");
    }
  };

  if (!worker) return <div>Loading...</div>;

  /* ================= CALCULATE AVERAGE RATING ================= */
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        {/* ================= PROFILE IMAGE ================= */}
        <img
          src={
            worker.profileImage
              ? `http://localhost:5000/${worker.profileImage}`
              : "https://via.placeholder.com/200"
          }
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        {/* ================= BASIC INFO ================= */}
        <h1 className="text-3xl font-bold mt-2">{worker.name}</h1>

        <p className="text-xl font-semibold text-green-700 uppercase">{worker.service}</p>

        {/* ⭐ Average Rating */}
        <p className="text-yellow-500 mt-1">⭐ {averageRating} / 5 ({reviews.length} reviews)</p>

        

        <p className="mt-2">📍 {worker.location}</p>
        <p>📞 {worker.phone}</p>
        <p>🎓 {worker.education}</p>
        <p>🛠 Experience: {worker.experience} years</p>
        <p>🗣 Languages: {worker.languages.join(", ")}</p>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex gap-4 mt-6">
          <a
            href={`tel:${worker.phone}`}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
          >
            Call
          </a>

          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg">
            Chat
          </button>
        </div>

        {/* ================= CUSTOMER REVIEWS ================= */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            Customer Reviews
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-lg mb-4"
              >
                <p className="font-semibold">
                  {review.user?.name || "User"}
                </p>
                <p>⭐ {review.rating}</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* ================= ADD REVIEW (USER ONLY) ================= */}
        {user?.role === "user" && (
          <div className="mt-10 bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">
              Rate this worker
            </h3>

            <StarRating rating={rating} setRating={setRating} />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="border p-2 rounded w-full mb-3"
            />

            <button
              onClick={submitReview}
              className="bg-emerald-600 text-white px-6 py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkerProfile;
