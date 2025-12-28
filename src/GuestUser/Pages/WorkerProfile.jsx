import { FaStar, FaMapMarkerAlt, FaPhone, FaComments } from "react-icons/fa"

function WorkerProfile() {
  const worker = {
    name: "Alex Abraham",
    service: "Electrician",
    location: "Kochi",
    rating: 4.6,
    experience: "6 Years",
    image: "https://static.vecteezy.com/system/resources/thumbnails/006/859/348/small/young-boy-indian-student-portrait-photo.jpg",
    skills: ["Wiring", "Appliance Repair", "Lighting"],
    reviews: [
      { user: "Rahul", comment: "Very professional and on time.", rating: 5 },
      { user: "Anita", comment: "Quick service and affordable.", rating: 4 }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-800 px-6 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row">

          {/* IMAGE */}
          <div className="md:w-1/3 bg-slate-800">
            <img
              src={worker.image}
              alt={worker.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="p-8 flex-1">

            <h2 className="text-3xl font-bold text-slate-800 mb-1">
              {worker.name}
            </h2>

            <p className="text-emerald-600 font-semibold text-lg">
              {worker.service}
            </p>

            <div className="flex gap-6 mt-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                {worker.rating} Rating
              </span>

              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-emerald-500" />
                {worker.location}
              </span>
            </div>

            <p className="mt-4 text-gray-600">
              <span className="font-medium text-slate-700">Experience:</span>{" "}
              {worker.experience}
            </p>

            {/* SKILLS */}
            <div className="mt-5 flex flex-wrap gap-3">
              {worker.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-md font-medium hover:bg-emerald-600 transition">
                <FaPhone /> Call
              </button>

              <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-900 transition">
                <FaComments /> Chat
              </button>
            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <div className="p-8 border-t bg-gray-50">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            Customer Reviews
          </h3>

          {worker.reviews.map((review, index) => (
            <div
              key={index}
              className="mb-5 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-slate-700">
                  {review.user}
                </p>
                <span className="flex items-center gap-1 text-sm">
                  <FaStar className="text-yellow-400" />
                  {review.rating}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default WorkerProfile
