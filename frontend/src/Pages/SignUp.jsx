import React, { useState } from "react";
import asset from "../assets/assets";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen min-w-full mb-3">
      {/* The left container with image */}
      <div className="hidden lg:flex flex-col items-center bg-bgColor w-full lg:w-3/6 rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-xl lg:text-2xl text-white text-center mt-3 mb-4">
          Join PlayPalette Today!
        </h2>
        <img
          src={asset.singUp_background}
          className="lg:block w-full lg:w-1/2 h-2/3 text-center p-4"
          alt="Background illustration"
        />
        <p className="text-white text-center px-4">
          Create a world of colorful learning for your little ones, where every
          session helps them build essential skills, boost their creativity, and
          discover the joy of shapes and colors in a safe, engaging environment
        </p>
      </div>
      {/* The right container */}
      <div className="flex flex-col pt-14 lg:pt-4 items-center w-full lg:w-2/5 px-4">
        <h2 className="text-2xl lg:text-3xl text-bgColor mb-4 text-center font-semibold">
          Sign In
        </h2>
        <form
          className="flex flex-col p-3 w-full max-w-xs"
          onSubmit={handleSubmit} // Add the form submit handler
        >
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update password on change
            placeholder="Enter your username"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 text-gray-900"
          />
          <label className="text-sm lg:text-base text-bgColor mb-1">
            email
          </label>
          <input
            type="email"
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)} // Update password on change
            placeholder="Enter your email"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 text-gray-900"
          />
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update email on change
            placeholder="Enter your email"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 mb-4 text-gray-900"
          />
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword} // Controlled input
            onChange={(e) => setConfirmPassword(e.target.value)} // Update password on change
            placeholder="Confirm your password"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 text-gray-900 mb-4"
          />

          <button
            type="submit" // Form submit
            className="w-full bg-bgColor text-white text-lg py-2 rounded-2xl transition-colors hover:bg-opacity-90 font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-400">
          already have an account? <a className="text-bgColor pl-2">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
