import React from "react";
import asset from "./../assets/assets";

const SignIn = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen min-w-full">
      {/* The left container */}
      <div className="flex flex-col pt-14 lg:pt-4 items-center w-full lg:w-2/5 px-4">
        <h2 className="text-2xl lg:text-3xl text-bgColor mb-4 text-center font-semibold">
          Sign In
        </h2>
        <form className="flex flex-col p-3 w-full max-w-xs">
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 mb-4 text-gray-900"
          />
          <label className="text-sm lg:text-base text-bgColor mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="outline-none bg-slate-300 rounded-lg px-4 py-2 text-gray-900"
          />
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
        {/* Divider */}
        <div className="flex items-center w-full max-w-xs mb-2 px-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="px-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>
        {/* Google Sign-In Button */}
        <button className="flex items-center justify-center border border-bgColor text-bgColor py-2 px-4 rounded-2xl transition-colors hover:bg-bgColor hover:text-white mb-4 max-w-xs w-full">
          <img
            src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
        <p className="text-gray-400">
          Don't have an account? <a className="text-bgColor pl-2">Sign up</a>
        </p>
      </div>

      {/* The right container with image */}
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
