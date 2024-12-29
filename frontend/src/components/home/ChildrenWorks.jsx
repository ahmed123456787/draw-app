import { React, useState } from "react";
import FileCard from "./FileCard";
import { BsFilterRight } from "react-icons/bs";

const ChildrenWorks = ({ data }) => {
  // State to hold filtered data

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [valueNameFilter, setValueNameFilter] = useState("");
  const [valueDateFilter, setValueDateFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data); 
  const [isCheckedName,setisCheckedName]=useState(false);
  const [isCheckedDate,setisCheckedDate]=useState(false);

  const handleFilterClick = () => {
    setShowFilterMenu((prev) => !prev);
  };
  const handleCheckboxNameChange=(event)=>{
    setisCheckedName(event.target.checked);
    if (!event.target.checked){
      console.log("is not checked")
      setFilteredData(data)
    }else if (event.target.checked){
      setShowNameDialog(true)
    }
  }
  const handleCheckboxDateChange=(event)=>{
    setisCheckedDate(event.target.checked);
    if (!event.target.checked){
      setFilteredData(data);
    }
    else if(event.target.checked){
      setShowDateDialog(true)
    }
  }
  const handleNameFilterClick = () => {
    setShowNameDialog(true);
    setShowFilterMenu(false); // Hide filter menu when showing name dialog
  };
  const handleDateFilterClick=() =>{

    setShowDateDialog(true);
    setShowFilterMenu(false)
  }
  const applyDateFilter = () => {
    if (valueDateFilter.trim() === "") {
      setFilteredData(data); // Reset to full data if filter is empty
    } else {
      // Validate date format (YYYY-MM-DD) using a regular expression
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(valueDateFilter)) {
        console.error("Invalid date format. Please use YYYY-MM-DD.");
        return; // Prevent invalid filtering
      }

      const filtered = data.filter((child) => {
        // Extract the date from the child's `lastEdit` property (assuming it's a string)
        const childDate = child.lastEdit.slice(0, 10); // Extract YYYY-MM-DD

        // Convert both the filter date and child date to Date objects for comparison
        const filterDate = new Date(valueDateFilter);
        const childDateObject = new Date(childDate);

        // Check if the child's last edited date matches the filter date
        return childDateObject.getTime() === filterDate.getTime();
      });

      setFilteredData(filtered);
    }
    setisCheckedDate(true);
    setShowDateDialog(false); // Close the dialog
  };

  const applyNameFilter = () => {
    if (valueNameFilter.trim() === "") {
      setFilteredData(data); // Reset to full data if filter is empty
    } else {
      const filtered = data.filter((child) => {
        // Normalize the child's name and create a regex
        const normalizedChildName = child.childName.toLowerCase();
  
        // Print each child's name in the console
        console.log("Child Name:", child.childName);
  
        // Assuming you want to match based on the valueNameFilter (using regex)
        const regex = new RegExp(valueNameFilter.toLowerCase(), 'i'); // Case-insensitive match
        return regex.test(normalizedChildName); // Return true if the regex matches
      });
  
      // Log the filtered results
      console.log("Filtered Results:", filtered);
      
      // Set the filtered data
      setFilteredData(filtered);
    }
    setisCheckedName(true)
    setShowNameDialog(false); // Close the dialog
  };
  

  return (
    <div className="flex flex-col mx-4 lg:mx-10">
      <div className="flex justify-between mb-4">
        <p className="text-bgColor font-medium">Recent Files</p>
        <div>
          <BsFilterRight className="w-6 h-6 text-bgColor cursor-pointer" onClick={handleFilterClick} />
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
              <input type="checkbox" checked={isCheckedName} onChange={handleCheckboxNameChange}  />
              </div>
              <div className="flex justify-between">
              <p 
              className="cursor-pointer hover:bg-gray-100 p-2"
              onClick={handleDateFilterClick}
              >Date
              </p>
              <input type="checkbox" checked={isCheckedDate} onChange={handleCheckboxDateChange}  />
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
                onClick={applyNameFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
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
