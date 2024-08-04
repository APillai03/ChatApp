import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Messagecontainer from "../../components/messages/Messagecontainer";

const Home = () => {
  return (
    <div
      className="flex  sm:h-[450px] rounded-lg
    overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 
   "
    >
      <Sidebar />
      <Messagecontainer />
    </div>
  );
};

export default Home;
