import React, { useState } from "react";
import asset from "./../assets/assets";

const SignChild = () => {
  const [code, setCode] = useState("");

  function printcode() {
    console.log(code);
    setCode(""); // Clear the input field
  }

  return (
    <div className="bg-bgColor min-w-full h-screen">
      <div className="flex justify-center pt-3 lg:pt-4">
        <h2 className="text-xl lg:text-3xl text-white text-center px-4 md:px-8">
          Ready to Draw? Let’s start the fun!
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center pt-2 lg:pt-10">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full">
          {/* Image Section */}
          <div className="flex justify-center w-full lg:w-1/2 p-4">
            <img
              src={asset.singChild_background}
              alt="Background"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Card Container */}
          <div className="w-3/4 sm:w-72 lg:w-96 h-auto bg-white rounded-2xl shadow-lg mt-4 lg:mt-0 mx-4 lg:mx-0 p-6 flex flex-col items-center">
            <h2 className="text-2xl text-bgColor mb-6 font-semibold">
              Enter the code
            </h2>
            <input
              placeholder="Enter the code"
              value={code} // Bind the input to the state
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-200 w-full p-4 rounded-lg outline-none text-black mb-4"
            />
            <button
              type="button"
              onClick={printcode}
              className="w-full text-xl text-white bg-bgColor rounded-xl py-2 mt-4 transition-colors hover:bg-opacity-80"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignChild;
