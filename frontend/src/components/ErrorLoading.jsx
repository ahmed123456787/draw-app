import React from "react";

const ErrorLoading = ({ refetch }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-red-500">
        Error loading drawings:
        <button
          onClick={() => refetch()}
          className="ml-4 px-4 py-2 bg-bgColor text-white rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorLoading;
