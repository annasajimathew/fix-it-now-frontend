import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common Components
import Navbar from "./Common/Components/Navbar";
import Footer from "./Common/Components/Footer";

// Guest User Pages
import HomePage from "./GuestUser/Pages/HomePage";
import WorkersHome from "./GuestUser/Pages/WorkersHome";
import ProfessionWorkers from "./GuestUser/Pages/ProfessionWorkers";
import WorkerProfile from "./GuestUser/Pages/WorkerProfile";

// Auth Pages
import Login from "./LoginUser/Pages/Login";
import RegisterUser from "./LoginUser/Pages/RegisterUser";
import RegisterWorker from "./LoginUser/Pages/RegisterWorker";

// Common Pages
import NotFound from "./Common/Pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<WorkersHome />} />
        <Route path="/workers/:profession" element={<ProfessionWorkers />} />
        <Route path="/worker/:id" element={<WorkerProfile />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/register/worker" element={<RegisterWorker />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
