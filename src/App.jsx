import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= COMMON =================
import Navbar from "./Common/Components/Navbar";
import Footer from "./Common/Components/Footer";
import ProtectedRoute from "./Common/Components/ProtectedRoute";
import NotFound from "./Common/Pages/NotFound";

// ================= GUEST =================
import HomePage from "./GuestUser/Pages/HomePage";
import WorkersHome from "./GuestUser/Pages/WorkersHome";
import ProfessionWorkers from "./GuestUser/Pages/ProfessionWorkers";
import WorkerProfile from "./GuestUser/Pages/WorkerProfile";

// ================= AUTH =================
import Login from "./LoginUser/Pages/Login";
import RegisterUser from "./LoginUser/Pages/RegisterUser";
import RegisterWorker from "./LoginUser/Pages/RegisterWorker";
import ForgotPassword from "./LoginUser/Pages/ForgotPassword";

// ================= USER =================
import UserDashboard from "./LoginUser/Pages/UserDashboard";
import UserChatPage from "./LoginUser/Pages/ChatPage";

// ================= WORKER =================
import WorkerDashboard from "./WorkerUser/Pages/WorkerDashboard";
import WorkerChatPage from "./WorkerUser/Pages/ChatPage";
import ProfileManagement from "./WorkerUser/Pages/ProfileManagement";
import ReviewsPage from "./WorkerUser/Pages/ReviewsPage";



// ================= ADMIN =================
import AdminDashboard from "./AdminUser/Pages/AdminDashboard";
import WorkerManagement from "./AdminUser/Pages/WorkerManagement";

function App() {
  return (
    <>
      <Navbar />
<div className="pt-15">
  
        <Routes>
          {/* ================= GUEST ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersHome />} />
          <Route path="/workers/:profession" element={<ProfessionWorkers />} />
          
          
          <Route path="/worker/profile" element={<ProtectedRoute role="worker"><ProfileManagement /></ProtectedRoute> }/>
          <Route path="/worker/reviews" element={<ProtectedRoute role="worker"><ReviewsPage /></ProtectedRoute>}/>
  
  
          {/* ================= AUTH ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/worker" element={<RegisterWorker />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
  
          {/* ================= USER ROUTES ================= */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/chat"
            element={
              <ProtectedRoute role="user">
                <UserChatPage />
              </ProtectedRoute>
            }
          />
  
          {/* ================= WORKER ROUTES ================= */}
          <Route
            path="/worker/dashboard"
            element={
              <ProtectedRoute role="worker">
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/:id"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <WorkerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/chat/"
            element={
              <ProtectedRoute role="worker">
                <WorkerChatPage />
              </ProtectedRoute>
            }
          />
  
          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
  
          <Route path="/admin/workers" element={<WorkerManagement />} />
  
          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
</div>

      <Footer />

      <ToastContainer position="top-right" autoClose={1000} theme="colored" />
    </>
  );
}

export default App;
