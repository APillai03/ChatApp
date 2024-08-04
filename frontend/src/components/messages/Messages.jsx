import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id || index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading
        ? [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
        : messages.length === 0 && (
            <p className="text-center">
              Send a message to start a conversation
            </p>
          )}
    </div>
  );
};

export default Messages;
