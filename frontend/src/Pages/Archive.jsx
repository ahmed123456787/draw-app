import React, { useState, useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { BsFilterRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import files from "../data/archive"
const ArchivePage = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showCreatedByDialog,setShowCreatedByDialog]=useState(false)
  const [valueNameFilter, setValueNameFilter] = useState("");
  const [valueDateFilter, setValueDateFilter] = useState("");
  const [valueCreatedByFilter,setValueCreatedByFilter]=useState("");
  const [filteredData, setFilteredData] = useState(files); 
  const [isCheckedName,setisCheckedName]=useState(false);
  const [isCheckedDate,setisCheckedDate]=useState(false);
  const [isCheckedCreatedBy,setisCheckedCreatedBy]=useState(false)
  const handleCheckboxNameChange=(event)=>{
    setisCheckedName(event.target.checked);
    if (!event.target.checked){
      console.log("is not checked")
      setFilteredData(files)
    }else if (event.target.checked){
      setShowNameDialog(true)
    }
  }
  const handleCheckboxDateChange=(event)=>{
    setisCheckedDate(event.target.checked);
    if (!event.target.checked){
      setFilteredData(files);
    }
    else if(event.target.checked){
      setShowDateDialog(true)
    }
  }
  const handleCheckboxCreatedByChangeChange=(event)=>{
    setisCheckedCreatedBy(event.target.checked);
    if(!event.target.checked){
      setFilteredData(files)
    }
    else if(event.target.checked){
      setShowCreatedByDialog(true)
    }

  }
  const handleFilterClick = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleNameFilterClick = () => {
    setShowNameDialog(true);
    setShowFilterMenu(false); // Hide filter menu when showing name dialog
  };

  const handleDateFilterClick = () => {
    setShowDateDialog(true);
    setShowFilterMenu(false); // Hide filter menu when showing date dialog
  };
  const handleCeatedByFilterClick = () => {
    setShowCreatedByDialog(true);
    setShowFilterMenu(false); // Hide filter menu when showing date dialog
  };
  const applyNameFilter = () => {
    if (valueNameFilter.trim() === "") {
      setFilteredData(files); // Reset to full data if filter is empty
    } else {
      const filtered = files.filter((file) => 
        file.name.toLowerCase().includes(valueNameFilter.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setShowNameDialog(false); // Close the dialog
  };
  const applyCreatedByFilter = () => {
    if (valueCreatedByFilter.trim() === "") {
      setFilteredData(files); // Reset to full data if filter is empty
    } else {
      const filtered = files.filter((file) => {
        console.log(file.createdBy.name +"compared to" +valueCreatedByFilter)
        if(file.createdBy.name.toLowerCase().includes(valueCreatedByFilter.toLowerCase())){
          console.log("true")
        }
         return file.createdBy.name.toLowerCase().includes(valueCreatedByFilter.toLowerCase())

      }
      );
      setFilteredData(filtered);
    }
    setShowCreatedByDialog(false); // Close the dialog
  };

  const applyDateFilter = () => {
    if (valueDateFilter.trim() === "") {
      setFilteredData(files); // Reset to full data if filter is empty
    } else {
       // Validate date format (YYYY-MM-DD) using a regular expression
       const regex = /^\d{4}-\d{2}-\d{2}$/;
       if (!regex.test(valueDateFilter)) {
         console.error("Invalid date format. Please use YYYY-MM-DD.");
         return; // Prevent invalid filtering
       }
 
       const filtered = filteredData.filter((file) => {
         // Extract the date from the child's `lastEdit` property (assuming it's a string)
         const archiveDate = file.archivedAt.slice(0, 10); // Extract YYYY-MM-DD
 
         // Convert both the filter date and child date to Date objects for comparison
         const filterDate = new Date(valueDateFilter);
         const childDateObject = new Date(archiveDate);
 
         // Check if the child's last edited date matches the filter date
         return childDateObject.getTime() === filterDate.getTime();
       });
 
       setFilteredData(filtered);
    }
    setShowDateDialog(false); // Close the dialog
  };

  // Sample data
  
  



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
        <BsFilterRight className="text-bgColor w-6 h-6 cursor-pointer" onClick={handleFilterClick} />


        {showFilterMenu && (
          <div className="absolute right-0 mt-[20%] bg-white shadow-lg rounded-lg p-2 w-[15%]">
            <p className="bg-gray-300 p-2">Filter by: </p>
            <div className="flex justify-between">
            <p className="cursor-pointer hover:bg-gray-100 p-2" onClick={handleNameFilterClick}>
              Name
            </p>
            <input type="checkbox" checked={isCheckedName} onChange={handleCheckboxNameChange}  />
            </div>
            <div className="flex justify-between">
            <p className="cursor-pointer hover:bg-gray-100 p-2" onClick={handleDateFilterClick}>
              Date
            </p>
            <input type="checkbox" checked={isCheckedDate} onChange={handleCheckboxDateChange}  />
            </div>
            <div className="flex justify-between">
            <p className="cursor-pointer hover:bg-gray-100 p-2" onClick={handleCeatedByFilterClick}>
              Created By
            </p>
            <input type="checkbox" checked={isCheckedCreatedBy} onChange={handleCheckboxCreatedByChangeChange}  />
            </div>
          </div>
        )}
      </div>
       
      {showCreatedByDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg lg:w-[30%] w-[90%] shadow-lg">
            <p className="text-lg font-medium mb-4">Enter a Name to Filter</p>
            <input
              type="text"
              value={valueCreatedByFilter}
              onChange={(e) => setValueCreatedByFilter(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="Enter  owner'name"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowCreatedByDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={applyCreatedByFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
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
                onClick={applyNameFilter}
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
                onClick={applyDateFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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
            {filteredData.map((file, index) => (
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
