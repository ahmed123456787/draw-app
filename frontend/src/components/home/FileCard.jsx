import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { BiSolidFileArchive } from "react-icons/bi";

const FileCard = ({ child, isLocked = true, isArchived = true, showProfileImage = true }) => {
  return (
    <div className="p-2">
      <div className="h-36 bg-[#D9D9D9] w-full rounded-2xl p-2  ">
        {showProfileImage && (
          <img src={child.profileImg} alt={child.childName} className="w-8 h-8 rounded-full" />
        )}
      </div>
      <p className="text-xl text-bgColor px-2">{child.name}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-[10px] text-bgColor px-2">{child.last_modified}</p>
        <div className="flex gap-2">
          {isArchived ? (
            <BiSolidFileArchive className="text-bgColor" />
          ) : (
            <FiFolder className="text-bgColor" />
          )}
          {isLocked ? <FaLock className="text-bgColor" /> : <FaUnlock className="text-bgColor" />}
          <RiDeleteBin5Line className="w-4 h-4 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
