function UserCard({ user }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm">{user.email}</p>
    </div>
  );
}

export default UserCard;
