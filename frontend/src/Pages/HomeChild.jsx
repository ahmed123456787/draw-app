import React, { useState } from "react";
import Sidebar from "../components/home/Sidebar";
import ChildrenWorks from "../components/home/ChildrenWorks";
import data from "../data";
import assets from "./../assets/assets";

const HomeChild = () => {
  const [username, setUsername] = useState("ahmed_99");
  const [userProfile, setuserProfile] = useState(assets.boy_1);

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar - fixed position */}
      <div className=" w-14 lg:w-52 h-screen fixed top-0 left-0 bg-bgColor rounded-br-3xl rounded-tr-3xl">
        <Sidebar />
      </div>

      {/* Right container - takes remaining width and has padding to accommodate fixed sidebar */}
      <div className="flex-1 ml-14 lg:ml-52 p-4">
        <div className="flex justify-end space-x-3 mb-12">
          <h2 className="text-bgColor">{username}</h2>
          <img src={userProfile} className="w-6 h-6 rounded-full" />
        </div>
        <ChildrenWorks data={data} className="" />
      </div>
    </div>
  );
};

export default HomeChild;
