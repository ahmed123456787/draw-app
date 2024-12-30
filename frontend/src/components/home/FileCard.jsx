import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { BiSolidFileArchive } from "react-icons/bi";
import { useUpdateDrawMutation, useGetDrawsQuery } from "../../services/drawApi";

const FileCard = ({ draw, showProfileImage = true }) => {
  const [updateDraw, { isLoading, isSuccess }] = useUpdateDrawMutation();
  const { refetch } = useGetDrawsQuery();
  const [localDraw, setLocalDraw] = useState(draw); // Local state for immutability

  // Refetch the data when update is successful
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  // Keep local state in sync with prop changes
  useEffect(() => {
    setLocalDraw(draw);
  }, [draw]);

  const handleUpdate = async (field) => {
    try {
      const newValue = !localDraw[field];
      await updateDraw({
        id: localDraw.id,
        [field]: newValue,
      }).unwrap();
      setLocalDraw((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    } catch (error) {
      console.error(`Failed to update ${field} status:`, error);
    }
  };

  return (
    <div className="p-2">
      <div className="h-36 bg-[#D9D9D9] w-full rounded-2xl p-2">
        {showProfileImage && (
          <img src={localDraw.profileImg} alt={localDraw.childName} className="w-8 h-8 rounded-full" />
        )}
      </div>
      <p className="text-xl text-bgColor px-2">{localDraw.name}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-[10px] text-bgColor px-2">{localDraw.last_modified}</p>
        <div className="flex gap-2">
          <button
            disabled={isLoading}
            onClick={() => handleUpdate("is_archived")}
            className="disabled:opacity-50"
          >
            {localDraw.is_archived ? (
              <BiSolidFileArchive className="text-bgColor cursor-pointer" />
            ) : (
              <FiFolder className="text-bgColor cursor-pointer" />
            )}
          </button>

          <button
            disabled={isLoading}
            onClick={() => handleUpdate("is_locked")}
            className="disabled:opacity-50"
          >
            {localDraw.is_locked ? (
              <FaLock className="text-bgColor cursor-pointer" />
            ) : (
              <FaUnlock className="text-bgColor cursor-pointer" />
            )}
          </button>

          <RiDeleteBin5Line className="w-4 h-4 text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
