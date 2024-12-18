import React from "react";
import images from "./../../assets/assets";

const HomeSection = () => {
  return (
    <div
      id="home"
      className="mt-8 lg:w-[80%] lg:h-[75vh] border-4 border-white rounded-3xl bg-whiteBlueColor flex flex-col justify-start items-center p-4"
    >
      <p className="lg:p-6 text-gray-900 text-4xl font-bold">Shape and forms</p>
      <p className="w-[50%] text-lg text-center leading-relaxed text-gray-600">
        Make your child start learning about shapes and colors. Explore the
        world now.
      </p>
      <img
        src={images.landing_page}
        className="animate-slideDown"
        alt="Landing Page"
      />
    </div>
  );
};

export default HomeSection;
