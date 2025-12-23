import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Common/Components/Navbar"
import Footer from "./Common/Components/Footer"

// Guest Pages
import HomePage from "./GuestUser/Pages/HomePage"
import WorkersHome from "./GuestUser/Pages/WorkersHome"
import ProfessionWorkers from "./GuestUser/Pages/ProfessionWorkers"
import WorkerProfile from "./GuestUser/Pages/WorkerProfile"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<WorkersHome />} />
        <Route path="/workers/:profession" element={<ProfessionWorkers />} />
        <Route path="/worker/:id" element={<WorkerProfile />} />
        

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
