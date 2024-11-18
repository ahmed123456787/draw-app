import React from "react";
import { FiHome } from "react-icons/fi";
import { BsFilterRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ArchivePage = () => {
  // Sample data
  const files = Array(8).fill({
    name: "TP GL",
    lastUpdate: "3 minutes ago",
    archivedAt: "01/09/2024",
    createdBy: { name: "Jalil", avatar: "https://via.placeholder.com/40" },
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button className="text-blue-500 p-2 rounded-full hover:bg-blue-100">
            <Link to={"/"}>
              <FiHome className="text-bgColor w-6 h-6" />
            </Link>
          </button>
          <h1 className="text-2xl font-bold text-bgColor">Archived Files</h1>
        </div>
        <BsFilterRight className="text-bgColor w-6 h-6 cursor-pointer" />
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="text-left text-gray-500 uppercase text-sm border-b border-gray-200">
              <th className="p-4 text-bgColor">Name</th>
              <th className="p-4 text-bgColor">Last update</th>
              <th className="p-4 text-bgColor">Archived at</th>
              <th className="p-4 text-bgColor">Created by</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <td className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <span className="text-gray-700">{file.name}</span>
                </td>
                <td className="p-4 text-gray-600">{file.lastUpdate}</td>
                <td className="p-4 text-gray-600">{file.archivedAt}</td>
                <td className="p-4 flex items-center space-x-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpK6DibZ8rjt974_abGKBQgsHJos2hJkxU_g&s"
                    alt={file.createdBy.name}
                    className="w-8 h-8 rounded-full bg-cover"
                  />
                  <span className="text-gray-700">{file.createdBy.name}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchivePage;
