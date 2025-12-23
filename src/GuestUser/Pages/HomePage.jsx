import { Link } from "react-router-dom"
import {
  FaBolt,
  FaTools,
  FaSnowflake,
  FaSearch,
  FaComments,
  FaStar
} from "react-icons/fa"

function HomePage() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}
<section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 text-white">

  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-slate-700 to-slate-800"></div>
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content */}
  <div className="relative text-center max-w-4xl">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
      Find Trusted Workers Near You
    </h1>

    <p className="text-base md:text-lg text-gray-200 mb-4 leading-relaxed">
      Connect with verified electricians, plumbers, mechanics, and skilled
      professionals in your area.
    </p>

    <p className="text-sm md:text-base text-gray-300 mb-10 leading-relaxed">
      FixItNow helps you find experienced service providers for home and
      workplace needs. Every worker is carefully verified, rated by real
      customers, and available based on your location, ensuring quality
      service, transparency, and peace of mind every time.
    </p>

    <Link
      to="/workers"
      className="inline-block bg-teal-500 text-black px-10 py-3 rounded-md font-semibold hover:bg-teal-400 transition"
    >
      Find a Professional
    </Link>
  </div>

</section>


      {/* ================= VISUAL SECTION ================= */}
      <section className="py-20 px-10 bg-gray-300">
        <h2 className="text-3xl font-semibold text-center text-slate-800 mb-12">
          Skilled Services at Your Fingertips
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="rounded overflow-hidden shadow hover:shadow-lg transition bg-slate-700">
            <img
              src="https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=612x612&w=0&k=20&c=stdWozouV2XsrHk2xXD3C31nT90BG7ydZvcpAn1Fx7I="
              alt="Electrician"
              className="h-56 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-100">Electricians</h3>
              <p className="text-sm text-gray-300">
                Safe and professional electrical services.
              </p>
            </div>
          </div>

          <div className="rounded overflow-hidden shadow hover:shadow-lg transition bg-slate-700">
            <img
              src="https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg"
              alt="Plumber"
              className="h-56 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-100">Plumbers</h3>
              <p className="text-sm text-gray-300">
                Quick solutions for all plumbing needs.
              </p>
            </div>
          </div>

          <div className="rounded overflow-hidden shadow hover:shadow-lg transition bg-slate-700">
            <img
              src="https://www.duckercarlisle.com/wp-content/uploads/2024/04/AdobeStock_700455066-scaled.jpeg"
              alt="Technician"
              className="h-56 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-100">Technicians</h3>
              <p className="text-sm text-gray-300">
                Expert repair and maintenance services.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= POPULAR SERVICES ================= */}
      <section className="py-24 px-10 bg-gray-600">
        <h2 className="text-3xl font-semibold text-center text-white mb-14">
          Popular Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition">
            <FaBolt className="text-4xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Electricians</h3>
            <p className="text-gray-500 text-sm">
              Certified professionals for electrical repairs and installations.
            </p>
          </div>

          <div className="bg-white p-10 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition">
            <FaTools className="text-4xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Plumbers</h3>
            <p className="text-gray-500 text-sm">
              Reliable plumbing services for homes and offices.
            </p>
          </div>

          <div className="bg-white p-10 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition">
            <FaSnowflake className="text-4xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AC Technicians</h3>
            <p className="text-gray-500 text-sm">
              Expert AC servicing, repair, and maintenance.
            </p>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 px-10 bg-gray-300">
        <h2 className="text-3xl font-semibold text-center text-slate-800 mb-16">
          How FixItNow Works
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <div>
            <div className="w-16 h-16 bg-teal-500 text-white flex items-center justify-center rounded-full mx-auto mb-6">
              <FaSearch size={22} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Search</h3>
            <p className="text-gray-500 text-sm">
              Find skilled workers based on service category and location.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 bg-teal-500 text-white flex items-center justify-center rounded-full mx-auto mb-6">
              <FaComments size={22} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Connect</h3>
            <p className="text-gray-500 text-sm">
              Chat or call workers directly through the platform.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 bg-teal-500 text-white flex items-center justify-center rounded-full mx-auto mb-6">
              <FaStar size={22} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Review</h3>
            <p className="text-gray-500 text-sm">
              Rate and review workers to help others choose better services.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative py-24 px-10 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-700"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Are You a Skilled Worker?
          </h2>
          <p className="text-gray-200 mb-8">
            Join FixItNow to reach more customers and grow your career.
          </p>
          <button className="bg-teal-500 px-8 py-3 rounded font-semibold hover:bg-teal-600 transition">
            Register as Worker
          </button>
        </div>
      </section>

    </div>
  )
}

export default HomePage
