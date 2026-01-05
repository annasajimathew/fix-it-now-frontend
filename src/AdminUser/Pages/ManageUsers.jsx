import { useEffect, useState } from "react";
import { getAllUsersAPI } from "../../services/authAPI";
import UserCard from "../Components/UserCard";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersAPI().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
