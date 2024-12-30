import React, { useState } from "react";
import asset from "./../../assets/assets";
import { FaRegFileArchive } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import CardCreation from "./CardCreation";
import { Link } from "react-router-dom";
import { useCreateChildrenMutation } from "./../../services/userApi";
import { useUserChildrenQuery } from "./../../services/userApi";

const Sidebar = ({ children }) => {
  const [showCreateChild, setShowCreateChild] = useState(false);
  const [createChildrenMutation] = useCreateChildrenMutation();
  const { refetch } = useUserChildrenQuery();

  // Handle form submission and async request
  const handleCreateChild = async (childData) => {
    try {
      await createChildrenMutation(childData); // Assuming childData contains the name
      refetch(); // Refetch children list
      setShowCreateChild(false); // Close modal on success
    } catch (error) {
      console.error("Error creating child:", error);
    }
  };

  return (
    <div className="">
      {showCreateChild && (
        <CardCreation
          onClose={() => setShowCreateChild(false)}
          avatarImage={asset.boy_1}
          onSubmit={handleCreateChild} // Pass the async handler to onSubmit
        />
      )}

      <div className={`flex flex-col mt-8 pl-3 ${showCreateChild ? "opacity-30" : ""}`}>
        {/* My children */}
        <Link to="/" className="flex items-center space-x-2 mb-6">
          <img src={asset.child_logo} alt="Logo" className="w-6 h-6 lg:w-4 lg:h-4" />
          <h2 className="text-xl font-bold text-white hidden lg:block">My Children</h2>
        </Link>

        {/* Scrollable area */}
        <div className="h-44 overflow-y-auto space-y-4 mb-6">
          {children.map((profile) => (
            <div key={profile.id} className="flex items-center space-x-2">
              <img src={asset.boy_1} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-white font-medium hidden lg:block">{profile.name}</span>
            </div>
          ))}
        </div>

        {/* Archive */}
        <Link to="/archive" className="flex items-center space-x-2 mb-6">
          <FaRegFileArchive className="text-white w-6 h-6 lg:w-4 lg:h-4" />
          <h2 className="text-white hidden lg:block">Archive</h2>
        </Link>

        {/* New Child */}
        <div
          onClick={() => setShowCreateChild(true)}
          className="flex items-center space-x-2 mb-6 cursor-pointer"
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
