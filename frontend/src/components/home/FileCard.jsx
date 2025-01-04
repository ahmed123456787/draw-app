import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { BiSolidFileArchive } from "react-icons/bi";
import {
  useUpdateDrawMutation,
  useGetDrawsQuery,
  useDeleteDrawByParentMutation,
} from "../../services/drawApi";
import {
  useGetDrawsByChildQuery,
  useDeleteDrawByChildMutation,
} from "../../services/childApi";

const FileCard = ({ draw, showProfileImage = true, isChild }) => {
  const [deleteByParent, { isLoading: isDeleteLoadingParent }] =
    useDeleteDrawByParentMutation();
  const [deleteByChild, { isLoading: isDeleteLoadingChild }] = useDeleteDrawByChildMutation();

  const { refetch } = useGetDrawsQuery();
  const { refetch: refetchChild } = useGetDrawsByChildQuery();
  const [updateDraw, { isLoading: isUpdateLoading }] = useUpdateDrawMutation();
  const [localDraw, setLocalDraw] = useState(draw);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setLocalDraw(draw);
    console.log("Draw updated:", localDraw);
  }, [draw]);

  const handleUpdate = async (field) => {
    try {
      const newValue = !localDraw[field];
      const result = await updateDraw({
        id: localDraw.id,
        [field]: newValue,
      }).unwrap();

      setLocalDraw((prev) => ({
        ...prev,
        [field]: newValue,
      }));

      await refetch();
    } catch (error) {
      console.error(`Failed to update ${field} status:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsVisible(false); // Immediately hide the card
      console.log(isChild);
      if (isChild) {
        await deleteByChild(localDraw.id).unwrap();
        await refetchChild();
      } else {
        await deleteByParent(localDraw.id).unwrap();
        await refetch();
      }
    } catch (error) {
      console.error("Failed to delete draw:", error);
      setIsVisible(true); // Show the card again if deletion fails
    }
  };

  if (!isVisible) return null;

  return (
    <div className="p-2 transition-opacity duration-300">
      <div className="h-36 bg-[#D9D9D9] w-full rounded-2xl p-2">
        {showProfileImage && (
          <img
            src={localDraw.profileImg}
            alt={localDraw.childName}
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
      <p className="text-xl text-bgColor px-2">{localDraw.name}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-[10px] text-bgColor px-2">{localDraw.last_modified}</p>
        <div className="flex gap-2">
          <button
            disabled={isUpdateLoading}
            onClick={() => handleUpdate("is_archived")}
            className="disabled:opacity-50"
          >
            {!isChild &&
              (localDraw.is_archived ? (
                <BiSolidFileArchive className="text-bgColor cursor-pointer" />
              ) : (
                <FiFolder className="text-bgColor cursor-pointer" />
              ))}
          </button>
          {!isChild && (
            <button
              disabled={isUpdateLoading}
              onClick={() => handleUpdate("is_locked")}
              className="disabled:opacity-50"
            >
              {localDraw.is_locked ? (
                <FaLock className="text-bgColor cursor-pointer" />
              ) : (
                <FaUnlock className="text-bgColor cursor-pointer" />
              )}
            </button>
          )}
          <button
            disabled={isDeleteLoadingParent || isDeleteLoadingChild}
            onClick={handleDelete}
            className="disabled:opacity-50"
          >
            <RiDeleteBin5Line className="w-4 h-4 text-red-500 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;