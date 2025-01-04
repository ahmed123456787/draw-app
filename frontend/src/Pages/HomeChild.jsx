import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import FileCard from "../components/home/FileCard";
import { MdOutlineAdd } from "react-icons/md";
import CardCreation from "../components/home/CardCreation";
import { useGetDrawsByChildQuery, useCreateDrawMutation } from "../services/childApi";
import Loading from "../components/Loading";
import ErrorLoading from "../components/ErrorLoading";

const HomeChild = () => {
  const { data, error, isLoading, refetch } = useGetDrawsByChildQuery();
  const [createDraw] = useCreateDrawMutation();
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem("child")).name);
  const [image, setImage] = useState(assets.boy_1);
  const [showCreateDraw, setShowCreateDraw] = useState(false);

  // Monitor query status changes
  useEffect(() => {
    if (isLoading) {
      console.log("Loading draws...");
    }
    if (error) {
      console.error("Error details:", {
        status: error?.status,
        message: error?.data,
      });
    }
  }, []);

  const handleDrawCreation = async (drawName) => {
    console.log("Creating draw with name:", drawName);
    await createDraw({
      name: drawName,
      draw_content: { content: "" },
      child: JSON.parse(localStorage.getItem("child")).id,
    });
    await refetch();
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorLoading refetch={refetch} />;

  return (
    <div className={`w-full min-h-screen bg-gray-100 py-8 px-8 relative`}>
      {showCreateDraw && (
        <CardCreation
          title="New Drawing"
          placeholder="Drawing Name"
          onClose={() => setShowCreateDraw(false)}
          avatarImage={assets.boy_1}
          onSubmit={handleDrawCreation}
        />
      )}

      <div className={`${showCreateDraw ? "opacity-100" : ""}`}>
        <div className="flex space-x-3 mb-6">
          <img src={image} className="rounded-full w-10 h-10 bg-cover" alt="User" />
          <h2 className="text-bgColor text-2xl font-semibold">{username}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data && data.length > 0 ? (
            data.map((draw) => (
              <FileCard key={draw.id} draw={draw} showProfileImage={false} isChild={true} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No drawings found. Click the + button to create your first drawing!
            </div>
          )}
        </div>
      </div>

      <MdOutlineAdd
        className="fixed bottom-10 right-10 bg-bgColor text-white rounded-full w-9 h-9 p-1 cursor-pointer"
        onClick={() => setShowCreateDraw(true)}
      />
    </div>
  );
};

export default HomeChild;
