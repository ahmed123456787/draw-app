import React, { useState, useRef } from 'react';
import images from './../assets/assets';
import {Link} from 'react-scroll'
import HomeSection from "./../components/landingPage/Home";
import AboutUsSection from "./../components/landingPage/About";
import ContactUsSection from "./../components/landingPage/Contact";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [choice, setChoice] = useState("home");
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar */}
      <div className="w-full lg:h-[15%] h-[8%] flex justify-end space-x-20  items-center z-50 fixed bg-white shadow-md px-2 ">
        <div className="flex flex-row justify-between items-center lg:w-[60%] w-[80%] h-full">
          <Link
            to="home"
            smooth={true}
            offset={-80}
            duration={2000}
            className={`cursor-pointer ${
              choice === "home" ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setChoice("home")}
          >
            Home
          </Link>
          <Link
            to="about-us"
            smooth={true}
            offset={-80}
            duration={2000}
            className={`cursor-pointer ${
              choice === "about-us" ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setChoice("about-us")}
          >
            About Us
          </Link>
          <Link
            to="contact-us"
            smooth={true}
            duration={2000}
            offset={-80}
            className={`cursor-pointer ${
              choice === "contact-us" ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setChoice("contact-us")}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex  w-[20%] h-[80%] space-x-3 text-white   items-center ">
          <button
            className="rounded-lg  px-2 bg-bgColor text-sm py-2"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Login Parent
          </button>
          <button
            className="rounded-lg  px-2 bg-bgColor text-sm py-2"
            onClick={() => {
              navigate("/sign-in-child");
            }}
          >
            Login child
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[80px] min-h-screen w-[100%] bg-landing-page-gradiant flex  flex-col justify-start items-center">
        {/* Sections */}
        <HomeSection />
        <AboutUsSection />
        <ContactUsSection id="contact-us" />
      </div>
    </>
  );
};

export default LandingPage;
