import React, { useState } from "react";
import Sidebar from "../components/home/Sidebar";
import ChildrenWorks from "../components/home/ChildrenWorks";
import data from "../data/index";
import assets from "../assets/assets";
import { useUserChildrenQuery } from "./../services/userApi";

import { useSelector } from "react-redux";

const HomeParent = () => {
  const [userProfile, setuserProfile] = useState(assets.boy_1);
  const username = useSelector((state) => state.auth.user.username);

  const { data: children, error, isLoading } = useUserChildrenQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar  */}
      <div className=" w-14 lg:w-52 h-screen fixed top-0 left-0 bg-bgColor rounded-br-3xl rounded-tr-3xl">
        <Sidebar children={children} />
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

export default HomeParent;
