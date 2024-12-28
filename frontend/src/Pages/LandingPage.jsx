import React, { useState, useRef } from 'react';
import images from './../assets/assets';
import {Link} from 'react-scroll'
import HomeSection from './../components/landingPage/HomeSection'
import AboutUsSection from './../components/landingPage/AboutUsSection'
import ContactUsSection from './../components/landingPage/ContactUsSection'
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
const [choice, setChoice] = useState("home");

  return (
    <>

      {/* Navbar */}
      <div className="w-full lg:h-[15%] h-[8%] flex justify-center items-center z-50 fixed bg-white shadow-md ">
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
      </div>

      {/* Content */}
      <div className="pt-[80px] min-h-screen w-[100%] bg-landing-page-gradiant flex  flex-col justify-start items-center">
        {/* Sections */}
        <HomeSection  />
        <AboutUsSection />
        <ContactUsSection id="contact-us"/>
      </div>
      
    </>
  );
};

export default LandingPage;
