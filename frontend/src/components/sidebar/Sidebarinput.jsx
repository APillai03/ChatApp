import React from "react";
import { IoIosSearch } from "react-icons/io";
const Sidebarinput = () => {
  return (
    <div>
      <form action="" className=" flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered
         rounded-full w-full"
        />
        <button
          type="Submit"
          className="btn 
        btn-sky-500 text-white"
        >
          <IoIosSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
};

export default Sidebarinput;
