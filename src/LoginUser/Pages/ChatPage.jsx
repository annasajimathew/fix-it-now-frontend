import ChatBox from "../Components/ChatBox";

function ChatPage() {
  // TEMP worker (later replace with real selection)
  const worker = {
    _id: "695932bb2fd1ba38fa6e6fa1",
    name: "Worker",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ChatBox otherUser={worker} />
    </div>
  );
}

export default ChatPage;
