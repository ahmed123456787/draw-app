import React, { useState } from "react";
import Sidebar from "../components/home/Sidebar";
import ChildrenWorks from "../components/home/ChildrenWorks";
import assets from "./../assets/assets";
import FileCard from "../components/home/FileCard";
import data from "../data/index"; // Ensure this is an array of file objects
import { MdOutlineAdd } from "react-icons/md";
import CardCreation from "../components/home/CardCreation";

const HomeChild = () => {
  const [username, setUsername] = useState("ahmed");
  const [image, setImage] = useState(assets.boy_1);
  const [showCreateDraw, setShowCreateDraw] = useState(false);

  return (
    <div className={`w-full min-h-screen bg-gray-100 py-8 px-8 relative`}>
      {/* Modal for creating a new card */}
      {showCreateDraw && (
        <CardCreation
          onClose={() => setShowCreateDraw(false)}
          avatarImage={assets.boy_1}
          onSubmit={() => alert("Create card")}
        />
      )}
      {/* Apply opacity only to the background content */}
      <div className={`${showCreateDraw ? "opacity-100" : ""}`}>
        <div className="flex space-x-3 mb-6">
          <img
            src={image}
            className="rounded-full w-10 h-10 bg-cover"
            alt="User"
          />
          <h2 className="text-bgColor text-2xl font-semibold">{username}</h2>
        </div>

        {/* Displaying multiple FileCard components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((file, index) => (
            <FileCard
              key={index}
              child={file} // Passing each file object to FileCard
              showEditInfo={true}
              showLockIcon={false}
              showProfileImage={false}
            />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      {console.log(showCreateDraw)}
      <MdOutlineAdd
        className="fixed bottom-10 right-10 bg-bgColor text-white rounded-full w-9 h-9 p-1 cursor-pointer"
        onClick={() => setShowCreateDraw(true)} // Opens CardCreation modal
      />
    </div>
  );
};

export default HomeChild;
