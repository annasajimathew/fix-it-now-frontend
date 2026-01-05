function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16 ">
      
      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-teal-400 mb-3">
            FixItNow
          </h2>
          <p className="text-sm text-gray-400">
            FixItNow is a platform that connects users with trusted local
            skilled workers like electricians, plumbers, and technicians.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-teal-400 cursor-pointer">Home</li>
            <li className="hover:text-teal-400 cursor-pointer">Find Workers</li>
            <li className="hover:text-teal-400 cursor-pointer">Login</li>
            <li className="hover:text-teal-400 cursor-pointer">Register</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@fixitnow.com</p>
          <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-400 mt-2">
            Serving communities with reliable services.
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 FixItNow | Built using MERN Stack
      </div>

    </footer>
  )
}

export default Footer
