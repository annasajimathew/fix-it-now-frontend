import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaTools, FaSnowflake, FaSearch, FaComments, FaStar,
} from "react-icons/fa";

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  // Services data
  const services = [
    {
      title: "Electricians",
      desc: "Safe and professional electrical services.",
      img: "https://images.unsplash.com/photo-1581091215362-9b3f6578f708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI2MTB8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHJlYWx8ZW58MHx8fHwxNjA5NzM1NjQw&ixlib=rb-4.0.3&q=80&w=600",
    },
    {
      title: "Plumbers",
      desc: "Quick solutions for all plumbing needs.",
      img: "https://images.unsplash.com/photo-1598876698110-8589a1f173f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI2MTB8MHwxfHNlYXJjaHwyfHxwbHVtYmVyfGVufDB8fHx8MTYwOTczNTY1NA&ixlib=rb-4.0.3&q=80&w=600",
    },
    {
      title: "Technicians",
      desc: "Expert repair and maintenance services.",
      img: "https://images.unsplash.com/photo-1581091215362-9b3f6578f708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI2MTB8MHwxfHNlYXJjaHwzfHx0ZWNobmljaWFuJTIwc2VydmljZXxlbnwwfHx8fDE2MDk3MzU2NzI&ixlib=rb-4.0.3&q=80&w=600",
    },
  ];

  // How it works steps
  const steps = [
    {
      icon: <FaSearch size={22} />,
      title: "Search Professionals",
      desc: "Browse skilled workers based on category, rating, and location.",
    },
    {
      icon: <FaComments size={22} />,
      title: "Connect Instantly",
      desc: "Contact workers directly to discuss requirements and schedule services.",
    },
    {
      icon: <FaStar size={22} />,
      title: "Rate & Review",
      desc: "Share your experience by rating and reviewing workers.",
    },
  ];

  return (
    <div className="bg-gray-900 relative overflow-hidden text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        {/* Background floating blobs */}
        <div className="absolute w-96 h-96 bg-gradient-to-tr from-teal-500 via-emerald-400 to-teal-400 rounded-full opacity-30 animate-blob top-[-20%] left-[-15%]"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full opacity-30 animate-blob animation-delay-2000 bottom-[-20%] right-[-15%]"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-tr from-teal-400 to-emerald-300 rounded-full opacity-20 animate-blob animation-delay-4000 top-[30%] right-[-15%]"></div>

        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white/20 rounded-full w-1 h-1 animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative text-center max-w-4xl animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500">
            Find Trusted Workers Near You
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed animate-fadeIn">
            Connect with verified electricians, plumbers, mechanics, and skilled professionals in your area.
          </p>
          <p className="text-gray-400 mb-10 animate-fadeIn">
            FixItNow helps you find experienced service providers for home and workplace needs. Every worker is verified, rated by real customers, and available based on your location.
          </p>
          <Link
            to="/workers"
            className="inline-block bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-black px-10 py-3 rounded-md font-semibold hover:scale-110 transform transition duration-500"
          >
            Find a Professional
          </Link>
        </div>
      </section>

      {/* ================= SKILLED SERVICES (Enhanced) ================= */}
<section className="py-24 px-6 md:px-10 bg-gray-800 relative overflow-hidden">
  <h2 className="text-3xl font-semibold text-center text-white mb-8">
    Skilled Services at Your Fingertips
  </h2>

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-teal-600 to-emerald-500 transform hover:-translate-y-2 hover:shadow-3xl transition">
      <img
        src="https://images.unsplash.com/photo-1581091215362-9b3f6578f708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000"
        alt="Electrician"
        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Electricians</h3>
        <p className="text-sm text-gray-200">
          Safe & professional electrical services at your doorstep.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-teal-600 to-emerald-500 transform hover:-translate-y-2 hover:shadow-3xl transition">
      <img
        src="https://images.unsplash.com/photo-1598876698110-8589a1f173f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000"
        alt="Plumber"
        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Plumbers</h3>
        <p className="text-sm text-gray-200">
          Fast & trusted plumbing solutions for your home.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-teal-600 to-emerald-500 transform hover:-translate-y-2 hover:shadow-3xl transition">
      <img
        src="https://images.unsplash.com/photo-1596445192240-17b9a2da50c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000"
        alt="Technician"
        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Technicians</h3>
        <p className="text-sm text-gray-200">
          Skilled maintenance & repair professionals.
        </p>
      </div>
    </div>

  </div>
</section>

      

      {/* ================= POPULAR SERVICES ================= */}
      <section className="py-24 px-10 bg-gray-900 relative overflow-hidden">
        <h2 className="text-3xl font-semibold text-center text-white mb-14 animate-fadeIn">
          Popular Services
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition hover:-translate-y-2 animate-slideUp">
            <FaBolt className="text-4xl text-teal-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-semibold mb-2 text-white">Electricians</h3>
            <p className="text-gray-400 text-sm">
              Certified professionals for electrical repairs and installations.
            </p>
          </div>

          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition hover:-translate-y-2 animate-slideUp animation-delay-200">
            <FaTools className="text-4xl text-teal-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-semibold mb-2 text-white">Plumbers</h3>
            <p className="text-gray-400 text-sm">
              Reliable plumbing services for homes and offices.
            </p>
          </div>

          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition hover:-translate-y-2 animate-slideUp animation-delay-400">
            <FaSnowflake className="text-4xl text-teal-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-semibold mb-2 text-white">AC Technicians</h3>
            <p className="text-gray-400 text-sm">
              Expert AC servicing, repair, and maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-28 px-10 bg-gray-800 relative overflow-hidden">
        <h2 className="text-3xl font-semibold text-center text-white mb-4 animate-fadeIn">
          How FixItNow Works
        </h2>
        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto animate-fadeIn">
          Finding reliable workers is simple and hassle-free. Follow these three easy steps to get the service you need.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step, i) => (
            <div key={i} className={`bg-gray-900 rounded-xl shadow-md p-10 hover:shadow-2xl transition hover:-translate-y-2 animate-slideUp animation-delay-${i*200}`}>
              <div className="w-16 h-16 bg-teal-500 text-white flex items-center justify-center rounded-full mx-auto mb-6 animate-bounce">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION (Simplified Floating Circles) ================= */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-r from-teal-500 via-slate-700 to-slate-800 overflow-hidden rounded-xl">
  <div className="max-w-5xl mx-auto text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
      Are You a Skilled Worker?
    </h2>
    <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
      Join FixItNow to reach more customers and grow your career. Showcase your skills and connect instantly with clients in your area.
    </p>
    <Link to={"/register/worker"} className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
      Register as Worker
    </Link>
  </div>
</section>


      {/* ================= ANIMATIONS STYLES ================= */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }

        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-slideUp { animation: slideUp 1s ease forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }

        @keyframes float {
          0% { transform: translateY(0) translateX(0);}
          50% { transform: translateY(-20px) translateX(10px);}
          100% { transform: translateY(0) translateX(0);}
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default HomePage;
