function ServiceCategoryCard({ icon, name }) {
  return (
    <div className="bg-white p-5 rounded shadow flex items-center gap-4 hover:shadow-lg">
      <div className="text-emerald-600 text-2xl">{icon}</div>
      <h3 className="font-semibold">{name}</h3>
    </div>
  );
}

export default ServiceCategoryCard;
