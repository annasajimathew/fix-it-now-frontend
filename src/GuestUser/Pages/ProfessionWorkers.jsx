import { useState } from "react"
import { useParams } from "react-router-dom"
import WorkerCard from "../Components/WorkerCard"

function ProfessionWorkers() {
  const { profession } = useParams()
  const [location, setLocation] = useState("")

  const allWorkers = [
    { id: 1, name: "Rahul Sharma", service: "Electrician", rating: 4.6, location: "Kochi", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Amit Verma", service: "Plumber", rating: 4.4, location: "Trivandrum", image: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: 3, name: "Suresh Kumar", service: "AC Technician", rating: 4.8, location: "Kottayam", image: "https://randomuser.me/api/portraits/men/68.jpg" },
    { id: 4, name: "Priya Nair", service: "Gardener", rating: 4.5, location: "Kochi", image: "https://randomuser.me/api/portraits/women/21.jpg" },
    { id: 5, name: "Vikram Das", service: "Painter", rating: 4.7, location: "Ernakulam", image: "https://randomuser.me/api/portraits/men/77.jpg" },
    { id: 6, name: "Anita Joseph", service: "Cook", rating: 4.3, location: "Trivandrum", image: "https://randomuser.me/api/portraits/women/33.jpg" },
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
