// ChildrenWorks.js
import React from "react";
import FileCard from "./FileCard";
import { BsFilterRight } from "react-icons/bs";

const ChildrenWorks = ({ data }) => {
  return (
    <div className="flex flex-col mx-4 lg:mx-10">
      <div className="flex justify-between mb-4">
        <p className="text-bgColor font-medium">Recent Files</p>
        <BsFilterRight className="w-6 h-6 text-bgColor" />
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3  gap-2 lg:gap-4">
        {data.map((child) => (
          <FileCard key={child.childName} child={child} />
        ))}
      </div>
    </div>
  );
};

export default ChildrenWorks;
