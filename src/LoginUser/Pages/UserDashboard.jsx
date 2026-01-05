import { FaSearch, FaUserCheck, FaComments, FaStar, FaTools } from "react-icons/fa";

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* ===== Greeting Marquee ===== */}
      <div className="bg-teal-600 text-white rounded-lg mb-6 overflow-hidden">
        <marquee className="py-3 text-sm md:text-base font-medium">
          👋 Welcome to FixItNow! Browse skilled workers, read real reviews, chat instantly, and book trusted services with ease.
        </marquee>
      </div>

      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          User Dashboard
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Your one-stop place to discover verified service professionals, connect with them directly,
          and manage your service needs efficiently.
        </p>
      </div>

      {/* ===== Dashboard Cards ===== */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Card 1 */}
        <div className="bg-white p-6 shadow rounded-xl border-l-4 border-teal-500">
          <FaSearch className="text-3xl text-teal-600 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">
            Browse Skilled Workers
          </h3>
          <p className="text-gray-600 text-sm">
            Search workers by profession such as electrician, plumber, technician, and more.
            Filter based on ratings and experience.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 shadow rounded-xl border-l-4 border-emerald-500">
          <FaUserCheck className="text-3xl text-emerald-600 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">
            View Profiles & Reviews
          </h3>
          <p className="text-gray-600 text-sm">
            Check detailed worker profiles, customer reviews, and average ratings
            before choosing the right professional.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 shadow rounded-xl border-l-4 border-sky-500">
          <FaComments className="text-3xl text-sky-600 mb-4" />
          <h3 className="font-semibold text-lg text-slate-800 mb-2">
            Chat & Book Services
          </h3>
          <p className="text-gray-600 text-sm">
            Chat directly with workers, discuss your requirements,
            and book services instantly through the platform.
          </p>
        </div>

      </div>

      {/* ===== Highlight Section ===== */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Why Use FixItNow?
        </h2>

        <ul className="grid md:grid-cols-2 gap-4 text-gray-600 text-sm">
          <li>✔ Verified and approved service professionals</li>
          <li>✔ Real customer ratings and reviews</li>
          <li>✔ Secure chat communication</li>
          <li>✔ Easy and fast service discovery</li>
          <li>✔ Transparent service selection</li>
          <li>✔ Saves time and effort</li>
        </ul>
      </div>

      {/* ===== Illustration Section ===== */}
      <div className="grid md:grid-cols-2 gap-6 items-center">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Everything You Need, In One Place
          </h2>
          <p className="text-gray-600 mb-4">
            FixItNow simplifies how you find and connect with skilled workers.
            Whether it's home repairs, maintenance, or technical services,
            everything is just a few clicks away.
          </p>
          <p className="text-gray-600 text-sm">
            Start by browsing workers, explore profiles, chat with professionals,
            and choose the best service that fits your needs.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80"
            alt="Service Illustration"
            className="rounded-xl shadow"
          />
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
