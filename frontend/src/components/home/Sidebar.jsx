import React, { useState } from "react";
import asset from "./../../assets/assets";
import { FaRegFileArchive } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import CreateChild from "./CreateChild";

const Sidebar = () => {
  const [showCreateChild, setShowCreateChild] = useState(false);

  const profiles = [
    { id: 1, name: "John Doe", avatar: asset.boy_1 },
    { id: 2, name: "Jane Smith", avatar: asset.boy_2 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_1 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_2 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_2 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_1 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_2 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_1 },
    { id: 3, name: "Mike Johnson", avatar: asset.boy_2 },
    // Add more profiles as needed
  ];

  return (
    <div className="">
      {showCreateChild && (
        <CreateChild onClose={() => setShowCreateChild(false)} />
      )}

      <div
        className={`flex flex-col mt-16 pl-3 ${
          showCreateChild ? "opacity-30" : ""
        }`}
      >
        {/* My children */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={asset.child_logo}
            alt="Logo"
            className="w-6 h-6 lg:w-4 lg:h-4"
          />
          <h2 className="text-xl font-bold text-white hidden lg:block ">
            My Children
          </h2>
        </div>

        {/* Scrollable area */}
        <div className="h-44 overflow-y-auto space-y-4 mb-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-center space-x-2">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-medium hidden lg:block">
                {profile.name}
              </span>
            </div>
          ))}
        </div>

        {/* Archive */}
        <div className="flex items-center space-x-2 mb-6">
          <FaRegFileArchive className="text-white w-6 h-6 lg:w-4 lg:h-4" />
          <h2 className="text-white hidden lg:block">Archive</h2>
        </div>

        {/* New Child */}
        <div
          onClick={() => setShowCreateChild(true)}
          className="flex items-center space-x-2 mb-6 cursor-pointer "
        >
          <IoMdAddCircle className="text-white w-6 h-6 lg:w-4 lg:h-4" />
          <h2 className="text-white hidden lg:block">New Child</h2>
        </div>

        {/* Log out */}
        <div className="flex items-center space-x-2 mb-6">
          <BiLogOut className="text-white w-6 h-6 lg:w-4 lg:h-4" />
          <h2 className="text-white hidden lg:block">Log out</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
