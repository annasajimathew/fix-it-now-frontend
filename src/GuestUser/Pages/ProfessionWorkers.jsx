import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WorkerCard from "../Components/WorkerCard";

function ProfessionWorkers() {
  const { profession } = useParams();
  const [workers, setWorkers] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, [profession]);

  const fetchWorkers = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/workers/${profession}`
    );
    setWorkers(res.data);
  };

  // 🔍 LOCATION FILTER
  const filteredWorkers = workers.filter(w =>
    location
      ? w.location.toLowerCase().includes(location.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-gray-900 px-10 py-20">
      <h2 className="text-3xl text-white font-bold text-center mb-8">
        {profession.toUpperCase()}S IN YOUR AREA
      </h2>

      {/* SEARCH BAR */}
      <div className="max-w-md mx-auto mb-10 bg-amber-50">
        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded-xl border"
        />
      </div>

      {filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredWorkers.map(worker => (
            <WorkerCard key={worker._id} worker={worker} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-900">
          No Approved workers found!
        </p>
      )}
    </div>
  );
}

export default ProfessionWorkers;
