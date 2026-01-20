function ReviewList({ reviews }) {
  const DEFAULT_PROFILE_IMAGE =
    "https://cdn-icons-png.flaticon.com/512/5675/5675059.png";

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-gray-200 p-4 rounded shadow flex gap-4 items-start"
        >
          {/* Reviewer Profile Image */}
          <img
            src={
              r.user?.profileImage
                ? `http://localhost:5000${r.user.profileImage}`
                : DEFAULT_PROFILE_IMAGE
            }
            alt="user"
            className="w-12 h-12 rounded-full object-cover border border-gray-400"
          />

          {/* Review Content */}
          <div>
            <p className="font-semibold text-black">
              {r.user?.name || "Anonymous"}
            </p>
            <p className="text-yellow-500 text-sm">⭐ {r.rating}</p>
            <p className="text-gray-600 text-sm">{r.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
