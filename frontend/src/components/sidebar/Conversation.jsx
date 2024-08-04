import React from "react";
import Conversations from "./Conversations";
import Getconversations from "../../hooks/Getconversations";
import { Emoji } from "../../utils/emoji";

const Conversation = () => {
  const { loading, conversations } = Getconversations();

  return (
    <div className="py-2 flex flex-col overflow-auto ">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
      {conversations.map((conversation, index) => (
        <Conversations
          key={conversation._id}
          conversation={conversation}
          emoji={Emoji()}
          lastindex={index === conversation.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversation;
