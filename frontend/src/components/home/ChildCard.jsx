import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLock } from "react-icons/fa";

const ChildCard = ({ child }) => {
  return (
    <div className="">
      <div className="h-36 bg-[#D9D9D9] w-full rounded-2xl p-2">
        <img
          src={child.profileImg}
          alt={""}
          className="w-8 h-8  rounded-full"
        />
      </div>
      <p className="text-1xl text-bgColor px-2">{child.childName}</p>
      <div className="flex justify-between items-center px-2">
        <p className="text-[10px] px-2">{child.lastEdit}</p>
        <div className="flex gap-2">
          <FaLock className="text-bgColor" />
          <RiDeleteBin5Line className="w-4 h-4 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
