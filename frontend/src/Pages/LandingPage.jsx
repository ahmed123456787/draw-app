import React, { useState } from "react";
import HomeSection from "./../components/landingPage/HomeSection";
import AboutUsSection from "./../components/landingPage/AboutUsSection";
import ContactUsSection from "./../components/landingPage/ContactUsSection";
import { Link } from "react-scroll";

const LandingPage = () => {
  const [choice, setChoice] = useState("home");

  return (
    <div className="min-h-screen bg-landing-page-gradiant flex flex-col justify-start items-center">
      {/* Navigation */}
      <div className="flex flex-row justify-between w-[60%] mt-8">
        <Link
          to="home"
          smooth={true}
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
          duration={2000}
          className={`cursor-pointer ${
            choice === "about-us" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setChoice("about-us")}
        >
          About us
        </Link>
        <Link
          to="contact-us"
          smooth={true}
          duration={2000}
          className={`cursor-pointer ${
            choice === "contact-us" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setChoice("contact-us")}
        >
          Contact us
        </Link>
      </div><div className="flex flex-row justify-between w-[60%] mt-8">
        <Link
          to="home"
          smooth={true}
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
          duration={2000}
          className={`cursor-pointer ${
            choice === "about-us" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setChoice("about-us")}
        >
          About us
        </Link>
        <Link
          to="contact-us"
          smooth={true}
          duration={2000}
          className={`cursor-pointer ${
            choice === "contact-us" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setChoice("contact-us")}
        >
          Contact us
        </Link>
      </div>

      {/* Sections */}
      <HomeSection />
      <AboutUsSection />
      <ContactUsSection />
    </div>
  );
};

export default LandingPage;
