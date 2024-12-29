import React, { useEffect, useState } from "react";
import asset from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../redux/slicers/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const [loginUser] = useLoginUserMutation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home-parent");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      const data = await loginUser({ email, password }).unwrap(); // Unwrap the response
      console.log("Login Response:", data);
      dispatch(setuserData(data)); // Dispatch the action

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home-parent");
    } catch (error) {
      console.error("Login Error:", error);
      // Extract and display error message from the API response
      setErrorMessage(
        error?.data?.detail || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen min-w-full">
      {/* Left container */}
      <div className="flex flex-col pt-14 lg:pt-4 items-center w-full lg:w-2/5 px-4">
        <h2 className="text-2xl lg:text-3xl text-bgColor mb-4 text-center font-semibold">
          Sign In
        </h2>
        <form
          className="flex flex-col p-3 w-full max-w-xs"
          onSubmit={handleSubmit}
        >
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 mb-4 text-gray-900"
          />
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 text-gray-900"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p> // Display error
          )}
          <div className="flex justify-end mb-3">
            <a href="#" className="text-sm text-bgColor">
              Forget Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-bgColor text-white text-lg py-2 rounded-2xl transition-colors hover:bg-opacity-90 font-semibold"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center w-full max-w-xs mb-2 px-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="px-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        <button className="flex items-center justify-center border border-bgColor text-bgColor py-2 px-4 rounded-2xl transition-colors hover:bg-bgColor hover:text-white mb-4 max-w-xs w-full">
          <img
            src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
        <p className="text-gray-400 cursor-pointer">
          Don't have an account?{" "}
          <a
            className="text-bgColor pl-2"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign up
          </a>
        </p>
      </div>

      {/* Right container */}
      <div className="hidden lg:flex flex-col items-center bg-bgColor w-full lg:w-3/5 rounded-tl-3xl rounded-bl-3xl">
        <h2 className="text-xl lg:text-2xl text-white text-center mt-3 mb-4">
          Welcome Back to Draw
        </h2>
        <img
          src={asset.singIn_background}
          className="lg:block w-full lg:w-2/3 h-1/2 text-center p-4"
          alt="Background illustration"
        />
        <p className="text-white text-center px-4">
          Log in to continue nurturing your child’s creativity through fun and
          interactive sessions, where they can explore the magic of shapes,
          colors, and endless possibilities for playful learning.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
