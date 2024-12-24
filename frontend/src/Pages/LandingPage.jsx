import React, { useState } from "react";
import HomeSection from "./../components/landingPage/HomeSection";
import AboutUsSection from "./../components/landingPage/AboutUsSection";
import ContactUsSection from "./../components/landingPage/ContactUsSection";
import { Link } from "react-scroll";

const LandingPage = () => {
  const [choice, setChoice] = useState("home");

  return (
    <>
      {/* Navbar */}
      <div className="w-full h-[15%] flex justify-center items-center z-50 fixed bg-white shadow-md ">
        <div className="flex flex-row justify-between items-center w-[60%] h-full">
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
