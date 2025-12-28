import { useState } from "react"
import { useParams } from "react-router-dom"
import WorkerCard from "../Components/WorkerCard"

function ProfessionWorkers() {
  const { profession } = useParams()
  const [location, setLocation] = useState("")

  const allWorkers = [
    { id: 1, name: "Kevin mathew", service: "Electrician", rating: 4.6, location: "Kochi", image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, name: "Toni Alex", service: "Plumber", rating: 4.4, location: "Trivandrum", image: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 3, name: "Deon Peter", service: "AC Technician", rating: 4.8, location: "Kottayam", image: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 4, name: "Nancy George", service: "Gardener", rating: 4.5, location: "Kochi", image: "https://thumbs.dreamstime.com/b/head-shot-portrait-beautiful-young-indian-woman-sitting-alone-sofa-home-posing-camera-exude-optimism-positive-mood-364417991.jpg" },
    { id: 5, name: "Victor Creel", service: "Painter", rating: 4.7, location: "Ernakulam", image: "https://media.istockphoto.com/id/2160830783/photo/positive-handsome-young-indian-man-head-shot-front-portrait.jpg?s=612x612&w=0&k=20&c=q8jNuQWO35W2-7luXuLdWGP2KKwKpdEUiVICJDjjku8=" },
    { id: 6, name: "Anita Joseph", service: "Cook", rating: 4.3, location: "Trivandrum", image: "https://thumbs.dreamstime.com/b/head-shot-portrait-young-pretty-indian-woman-standing-library-head-shot-portrait-young-pretty-indian-woman-standing-library-395580049.jpg" },
  ]

  const filteredWorkers = allWorkers.filter(
    worker => worker.service === profession &&
      (location === "" || worker.location.toLowerCase().includes(location.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-400 px-10 py-20">

      <h2 className="text-3xl font-semibold text-slate-800 mb-10 text-center">
        {profession} in Your Area
      </h2>

      <div className="max-w-3xl mx-auto mb-10">
      
        <input
          type="text"
          placeholder="Search By Entering Your city"
          className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:border-emerald-500 bg-gray-200"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      {filteredWorkers.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {filteredWorkers.map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No workers found in this location.</p>
      )}

    </div>
  )
}

export default ProfessionWorkers
