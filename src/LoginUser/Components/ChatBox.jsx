import { useEffect, useState } from "react";
import {
  sendMessageAPI,
  getChatAPI,
  deleteChatAPI
} from "../../services/chatAPI";

function ChatBox({ otherUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  /* ===== LOAD CHAT ===== */
  useEffect(() => {
    if (otherUser?._id) {
      getChatAPI(otherUser._id).then((res) => {
        setMessages(res.data);
      });
    }
  }, [otherUser]);

  /* ===== SEND MESSAGE ===== */
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await sendMessageAPI({
      receiverId: otherUser._id,
      message: text
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  /* ===== DELETE CHAT ===== */
  const deleteChat = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entire chat?"
    );
    if (!confirmDelete) return;

    try {
      await deleteChatAPI(otherUser._id);

      // ✅ clear messages from UI
      setMessages([]);
    } catch (err) {
      alert("Failed to delete chat");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center p-3 border-b border-slate-800">
        <p className="text-white font-medium">
          {otherUser?.name || "Chat"}
        </p>

        <button
          onClick={deleteChat}
          className="text-red-400 text-sm hover:underline"
        >
          Delete Chat
        </button>
      </div>

      {/* ===== MESSAGES ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No messages
          </p>
        )}

        {messages.map((msg) => {
          const senderId =
            typeof msg.sender === "string"
              ? msg.sender
              : msg.sender?._id;

          const isMine = senderId === currentUser._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-md text-sm ${
                  isMine
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-slate-700 text-slate-200 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== INPUT ===== */}
      <div className="flex p-3 border-t border-slate-800 bg-slate-900">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 text-white px-3 py-2 rounded mr-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-600 text-white px-4 rounded hover:bg-emerald-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
