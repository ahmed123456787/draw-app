import React, { useState } from "react";
import asset from "./../assets/assets";
import { useLoginChildMutation } from "../services/childApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignChild = () => {
  const navigate = useNavigate();
  const [loginChild] = useLoginChildMutation();
  const [code, setCode] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginChild({ token: code }).unwrap();
      setCode(""); // for clearning the input field
      console.log("Login Response:", data);
      Cookies.set("sessionid", JSON.stringify(data.session_key), { expires: 1 }); // Expires in 1 day
      console.log("Login Response:", data);
      navigate("/home-child");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

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
            <h2 className="text-2xl text-bgColor mb-6 font-semibold">Enter the code</h2>
            <input
              placeholder="Enter the code"
              value={code} // Bind the input to the state
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-200 w-full p-4 rounded-lg outline-none text-black mb-4"
            />
            <button
              type="button"
              onClick={handleLogin}
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
