import ChatBox from "../../LoginUser/Components/ChatBox";

function ChatPage() {
  const user = {
    _id: "695933962fd1ba38fa6e6fa5",
    name: "User",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ChatBox otherUser={user} />
    </div>
  );
}

export default ChatPage;
