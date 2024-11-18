import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const CardCreation = ({
  onClose,
  title = "New Child", // Default title
  placeholder = "Child Name", // Default placeholder
  avatarImage, // Avatar image prop
  onSubmit, // Callback for "Create" button
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-bgColor text-white rounded-lg px-12 py-6 w-full max-w-lg md:px-12 mx-12 md:py-8">
        <h2 className="text-2xl text-center font-semibold mb-6">{title}</h2>

        {/* Centered Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={avatarImage}
            className="w-12 h-12 rounded-full " // Adjust size and color as needed
          />
        </div>

        {/* Input Field */}
        <div className="flex flex-col mb-6">
          <label className="mb-1 text-sm font-medium">{placeholder}</label>
          <input
            placeholder={placeholder}
            className="outline-none rounded-lg text-bgColor py-2 px-3 bg-white placeholder-gray-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCreation;
