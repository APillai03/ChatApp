import React from "react";
import Sidebarinput from "./Sidebarinput";
import Conversation from "./Conversation";
import Logoutbutton from "./Logoutbutton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      <Sidebarinput />
      <div className="divider px-3"></div>
      <Conversation />
      <Logoutbutton />
    </div>
  );
};

export default Sidebar;
