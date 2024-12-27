import React from "react";
import images from "./../../assets/assets";

const HomeSection = () => {
  return (
    <section
      id="home"
      className=" w-[80%] mt-[5%] lg:min-h-screen  border-4 border-white rounded-3xl bg-whiteBlueColor flex flex-col justify-start items-center p-4"
    >
      <p className="p-6  text-gray-900 lg:text-4xl text-2xl font-bold">Shape and forms</p>
      <p className="w-[50%] text-lg text-center leading-relaxed text-gray-600">
        Make your child start learning about shapes and colors. Explore the
        world now.
      </p>
      <img
        src={images.landing_page}
        className="animate-slideDown w-[100%] h-[80%]"
        alt="Landing Page"
      />
    </section>
  );
};

export default HomeSection;
