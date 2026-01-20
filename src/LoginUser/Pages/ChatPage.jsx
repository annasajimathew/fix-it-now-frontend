import ChatBox from "../Components/ChatBox";

function ChatPage() {
  const otherUser = JSON.parse(sessionStorage.getItem("selectedChatUser"));

  if (!otherUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No chat selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ChatBox otherUser={otherUser} />
    </div>
  );
}

export default ChatPage;
