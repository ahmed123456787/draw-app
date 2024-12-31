import React, { useState } from "react";
import assets from "../assets/assets";
import FileCard from "../components/home/FileCard";
import { MdOutlineAdd } from "react-icons/md";
import CardCreation from "../components/home/CardCreation";
import { useGetDrawsByChildQuery } from "../services/drawApi";

const HomeChild = () => {
  const { data, error, isLoading } = useGetDrawsByChildQuery();
  if (error) {
    console.error("Error fetching data:", error);
  }
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
          <img src={image} className="rounded-full w-10 h-10 bg-cover" alt="User" />
          <h2 className="text-bgColor text-2xl font-semibold">{username}</h2>
        </div>

        {/* Displaying multiple FileCard components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((draw, index) => (
            <FileCard
              key={index}
              draw={draw} // Passing each file object to FileCard
              showProfileImage={false}
            />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <MdOutlineAdd
        className="fixed bottom-10 right-10 bg-bgColor text-white rounded-full w-9 h-9 p-1 cursor-pointer"
        onClick={() => setShowCreateDraw(true)} // Opens CardCreation modal
      />
    </div>
  );
};

export default HomeChild;
