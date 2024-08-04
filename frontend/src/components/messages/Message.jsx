import React from "react";
import { useAuth } from "../../context/Authcontext";
import useConversation from "../../Zustand/useconversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  console.log(authUser._id);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilepic = fromMe
    ? authUser.profilepic
    : selectedConversation.profilepic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""; // Adjusted for Instagram-like colors
  // Adjusted for Instagram-like text colors
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar"></div>
      <div
        className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
