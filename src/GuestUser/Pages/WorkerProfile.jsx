import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaComments, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserUnreadCountAPI } from "../../services/chatAPI";



/* ================= STAR RATING COMPONENT ================= */
const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);


  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer transition ${
            hover >= star || rating >= star
              ? "text-yellow-400"
              : "text-gray-400"
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
  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchWorker();
    fetchReviews();
  }, [id]);

  useEffect(() => {
  if (user?.role === "user" && worker?._id) {
    getUserUnreadCountAPI(worker._id).then((res) => {
      setUnreadCount(res.data.unreadCount);
    });
  }
}, [worker, user]);


  /* ================= FETCH WORKER ================= */
  const fetchWorker = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/workers/profile/${id}`
    );
    setWorker(res.data);
  };

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/reviews/public/${id}`
    );
    setReviews(res.data);
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    if (!rating || !comment) {
      toast.error("Please provide rating and comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review submitted successfully ⭐");

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  };

  /* ================= DELETE REVIEW ================= */
  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review deleted");
      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!worker) return <div className="p-10 text-center text-gray-400">Loading...</div>;

  /* ================= SORT REVIEWS (NEWEST FIRST) ================= */
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const averageRating =
    sortedReviews.length > 0
      ? (
          sortedReviews.reduce((sum, r) => sum + r.rating, 0) /
          sortedReviews.length
        ).toFixed(1)
      : "No ratings";

  const visibleReviews = showAllReviews
    ? sortedReviews
    : sortedReviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">

        {/* PROFILE IMAGE */}
        <img
          src={
            worker.profileImage
              ? `http://localhost:5000/${worker.profileImage}`
              : "https://via.placeholder.com/300"
          }
          className="w-full h-80 object-cover rounded-xl mb-6 shadow"
          alt="Worker"
        />

        {/* BASIC INFO */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{worker.name}</h1>
          <p className="text-lg font-semibold text-emerald-700 uppercase">
            {worker.service}
          </p>

          <p className="text-yellow-500 mt-1 font-medium">
            ⭐ {averageRating} / 5 ({sortedReviews.length} reviews)
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-gray-700 mb-8">
          <p>📍 {worker.location}</p>
          <p>📞 {worker.phone}</p>
          <p>🎓 {worker.education}</p>
          <p>🛠 Experience: {worker.experience} years</p>
          <p className="sm:col-span-2">
            🗣 Languages: {worker.languages?.join(", ")}
          </p>
        </div>

        {/* call and chat */}
        {user?.role === "user" && (
          <div className="flex gap-4 mb-6">
            {worker.phone && (
              <a
                href={`tel:${worker.phone}`}
                className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                <FaPhoneAlt />
                Call
              </a>
            )}

           {worker.isApproved && (
    <button
      onClick={() => {
        sessionStorage.setItem(
          "selectedChatUser",
          JSON.stringify({
            _id: worker._id,
            name: worker.name,
          })
        );
        navigate("/user/chat");
      }}
      className="relative flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition">
      <FaComments />
      Chat

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {unreadCount}
        </span>
      )}
   </button>

)}

          </div>
        )}

        


        {/* REVIEWS */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Customer Reviews
          </h3>

          {sortedReviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <>
              {visibleReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-teal-50 border rounded-xl p-5 mb-4 shadow-sm relative"
                >
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">

                      {/* USER PROFILE IMAGE */}
                      <img
                        src={
                          review.user?.profileImage
                            ? `http://localhost:5000${review.user.profileImage}`
                            : "https://cdn-icons-png.flaticon.com/512/5675/5675059.png"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover border"
                      />

                      <div>
                        <p className="font-semibold text-slate-800">
                          {review.user?.name}
                        </p>
                        <p className="text-yellow-500 text-sm">
                          ⭐ {review.rating}
                        </p>
                      </div>
                    </div>

                    {(user?.role === "admin" ||
                      (user?.role === "user" &&
                        review.user?._id === user?._id)) && (
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="text-gray-600 mt-2">
                    {review.comment}
                  </p>
                </div>
              ))}

              {sortedReviews.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-cyan-600 font-bold mt-2 hover:underline"
                >
                  {showAllReviews ? "Show Less  →" : "Load More →"}
                </button>
              )}
            </>
          )}
        </div>

        {/* ADD REVIEW */}
        {user?.role === "user" && (
          <div className="mt-12 bg-slate-900 text-white p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold mb-4">
              Add Your Review
            </h3>

            <StarRating rating={rating} setRating={setRating} />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white mb-4 focus:ring-2 focus:ring-emerald-400"
            />

            <button
              onClick={submitReview}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
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
