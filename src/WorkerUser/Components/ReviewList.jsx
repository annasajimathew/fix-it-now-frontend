function ReviewList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">{r.user.name}</p>
          <p className="text-yellow-500">⭐ {r.rating}</p>
          <p className="text-gray-600">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
