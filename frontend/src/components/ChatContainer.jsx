import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser?._id]);

  if (isMessagesLoading) return <div>Loaging...</div>;

  return (
    <div className="flex flex-1 overflow-auto">
      <ChatHeadre />

      <p>Messages...</p>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
