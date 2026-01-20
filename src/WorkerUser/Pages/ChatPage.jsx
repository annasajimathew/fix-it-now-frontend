import { useEffect, useState } from "react";
import { getWorkerUsersAPI } from "../../services/chatAPI";
import ChatBox from "../../LoginUser/Components/ChatBox";

function WorkerChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  

  // 🔁 load / reload user list
  const loadUsers = () => {
    getWorkerUsersAPI().then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="bg-slate-900 p-6 overflow-hidden">
      {/* ===== MAIN CONTAINER ===== */}
      <div className="flex gap-6 h-[calc(100vh-96px)]">

        {/* ===== LEFT: USER LIST ===== */}
        <div className="w-1/3 min-w-[260px] bg-slate-800 rounded-xl p-4 flex flex-col">
          <h2 className="text-white text-lg mb-4">Chats</h2>

          {/* SCROLLABLE LIST */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {users.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  // open chat
                  setSelectedUser({
                    _id: u._id,
                    name: u.user?.name,
                    profileImage: u.user?.profileImage
                  });

                  // ✅ refresh unread count after messages are marked read
                  setTimeout(loadUsers, 300);
                }}
                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition
                  ${
                    selectedUser?._id === u._id
                      ? "bg-slate-700"
                      : "bg-slate-900 hover:bg-slate-700"
                  }`}
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      u.user?.profileImage
                        ? `http://localhost:5000${u.user.profileImage}`
                        : "https://cdn-icons-png.flaticon.com/512/5675/5675059.png"
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                  />

                  <p className="text-white font-medium truncate max-w-[140px]">
                    {u.user?.name}
                  </p>
                </div>

                {/* UNREAD BADGE */}
                {u.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {u.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT: CHAT ===== */}
        <div className="flex-1 bg-slate-800 rounded-xl overflow-hidden">
          {selectedUser ? (
            <ChatBox otherUser={selectedUser} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerChatPage;
