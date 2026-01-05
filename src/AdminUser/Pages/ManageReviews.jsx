import ReviewCard from "../Components/ReviewCard";

function ManageReviews() {
  const dummyReviews = [
    {
      workerName: "Alex",
      comment: "Very professional",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>

      <div className="space-y-4">
        {dummyReviews.map((rev, idx) => (
          <ReviewCard key={idx} review={rev} />
        ))}
      </div>
    </div>
  );
}

export default ManageReviews;
