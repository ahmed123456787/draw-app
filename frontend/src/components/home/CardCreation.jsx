import React, { useState } from "react";

const CardCreation = ({
  onClose,
  title = "New Child", // Default title
  placeholder = "Child Name", // Default placeholder
  avatarImage, // Avatar image prop
  onSubmit, // Callback for "Create" button
}) => {
  const [childName, setChildName] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  const handleSubmit = async () => {
    if (childName.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Call the onSubmit function passed as prop (make sure it's async)
      await onSubmit({ name: childName });
      setLoading(false);
      onClose(); // Close the modal after successful creation
    } catch (err) {
      setLoading(false);
      setError("Failed to create child. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-bgColor text-white rounded-lg px-12 py-6 w-full max-w-lg md:px-12 mx-12 md:py-8">
        <h2 className="text-2xl text-center font-semibold mb-6">{title}</h2>

        {/* Centered Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={avatarImage}
            className="w-12 h-12 rounded-full" // Adjust size and color as needed
          />
        </div>

        {/* Input Field */}
        <div className="flex flex-col mb-6">
          <label className="mb-1 text-sm font-medium">{placeholder}</label>
          <input
            placeholder={placeholder}
            className="outline-none rounded-lg text-bgColor py-2 px-3 bg-white placeholder-gray-500"
            onChange={(e) => setChildName(e.target.value)}
            value={childName}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit} // Use handleSubmit to manage async behavior
            className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCreation;
