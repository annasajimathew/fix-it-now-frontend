import { Link } from "react-router-dom";

function ServiceCategoryCard({ name, icon }) {
  return (
    <Link
      to={`/workers/${name}`}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4"
    >
      <div className="text-3xl text-emerald-500">{icon}</div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
    </Link>
  );
}

export default ServiceCategoryCard;
