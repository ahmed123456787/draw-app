import { React, useState } from "react";
import FileCard from "./FileCard";
import { BsFilterRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { filterData } from "../../utils/filter";  // Assuming you have a filterData utility

const selectDraws = (state) => state.drawapi.queries["getDraws(undefined)"]?.data;

const ChildrenWorks = () => {
  const data = useSelector(selectDraws);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [valueNameFilter, setValueNameFilter] = useState("");
  const [valueDateFilter, setValueDateFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Function to apply the filters
  const applyFiltr = () => {
    let result = data;
    if (valueNameFilter !== "") {
      result = filterData("name", valueNameFilter, result);
    }
    if (valueDateFilter !== "") {
      result = filterData("date", valueDateFilter, result);
    }
    setFilteredData(result);
  };

  const handleFilterClick = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleNameFilterClick = () => {
    setShowNameDialog(true);
    setShowFilterMenu(false);
  };

  const handleDateFilterClick = () => {
    setShowDateDialog(true);
    setShowFilterMenu(false);
  };

  return (
    <div className="flex flex-col mx-4 lg:mx-10">
      <div className="flex justify-between mb-4">
        <p className="text-bgColor font-medium">Recent Files</p>
        <div>
          <BsFilterRight
            className="w-6 h-6 text-bgColor cursor-pointer"
            onClick={handleFilterClick}
          />
          {showFilterMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-[15%]">
              <p className="bg-gray-300 p-2">Filter by: </p>
              <div className="flex justify-between">
                <p
                  className="cursor-pointer hover:bg-gray-100 p-2"
                  onClick={handleNameFilterClick}
                >
                  Name
                </p>
              </div>
              <div className="flex justify-between">
                <p
                  className="cursor-pointer hover:bg-gray-100 p-2"
                  onClick={handleDateFilterClick}
                >
                  Date
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show Name Filter Dialog */}
      {showNameDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg lg:w-[30%] w-[90%] shadow-lg">
            <p className="text-lg font-medium mb-4">Enter a Name to Filter</p>
            <input
              type="text"
              value={valueNameFilter}
              onChange={(e) => setValueNameFilter(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="Enter name"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowNameDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  setShowNameDialog(false);
                  applyFiltr();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Show Date Filter Dialog */}
      {showDateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg lg:w-[30%] w-[90%] shadow-lg">
            <p className="text-lg font-medium mb-4">Enter a Date to Filter</p>
            <input
              type="text"
              value={valueDateFilter}
              onChange={(e) => setValueDateFilter(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="YYYY-MM-DD"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDateDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  setShowDateDialog(false);
                  applyFiltr();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {filteredData.map((child) => (
          <FileCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
};

export default ChildrenWorks;
