import { useState } from "react";
import { sendMessageAPI } from "../../services/chatAPI";

function ChatBox({ chatId, messages, setMessages }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text) return;

    const res = await sendMessageAPI({
      chatId,
      text,
    });

    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-3 rounded max-w-xs ${
              msg.isMine
                ? "bg-emerald-500 text-white ml-auto"
                : "bg-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-3 border-t bg-white">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
