import React, { useState, useRef } from 'react';
import images from './../assets/assets';
import { Link } from 'react-scroll'

const LandingPage = () => {
const [choice, setChoice] = useState("home");

  return (
    <div className='min-h-screen bg-landing-page-gradiant flex flex-col justify-start items-center'>
      {/* Home page */}
      <div id='home' className='mt-8  lg:w-[80%] lg:h-[75vh] border-4 border-white rounded-3xl bg-whiteBlueColor flex flex-col justify-start items-center p-4'>
        <div className='flex flex-row justify-between    w-[60%]'>

          {/* Home link */}
          <Link
            to="home"
            smooth={true}
            duration={2000}
            className={`cursor-pointer ${choice === "home" ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setChoice("home")}
          >
            Home
          </Link>

          {/* About Us link */}
          <Link
            to="about-us"
            smooth={true}
            duration={2000} // Ajustez la durée ici pour un défilement plus lent
            className={`cursor-pointer ${choice === "about-us" ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setChoice("about-us")}
          >
            About us
          </Link>

          {/* Contact Us link */}
          <Link
            to="contact-us"
            smooth={true}
            duration={2000}
            className={`cursor-pointer ${choice === "contact-us" ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setChoice("contact-us")}
          >
            Contact us
          </Link>      
          </div>
        <p className='lg:p-6 text-gray-900 text-4xl font-bold'>Shape and forms</p>
        <p className='w-[50%] text-lg text-center leading-relaxed text-gray-600'>Make your child start learning about shapes and colors. Explore the world now.</p>
        <img 
          src={images.landing_page} 
          className="animate-slideDown"
          alt="Landing Page" 
        />
      </div>

      {/* About Us section */}
      <div
        id='about-us'
        className='w-[70%] h-[185vh] border-1 flex space-y-6 flex-col justify-start items-center bg-whiteBlueColor mt-40 border-4 border-white rounded-3xl'
      >
        <p className='text-3xl text-black font-bold p-4'>Welcome to KidzDraw World</p>
        <p className='text-gray-400 text-xl font-bold'>Where Fun Shapes Bright Minds!</p>
        {/* Our purpose */}
        <div className='flex justify-between items-center w-[95%] h-[20%]'>
          <div className='w-[70%]'>
            <p className='text-3xl text-black font-bold text-center'>Our purpose</p>
            <p className='text-center p-5'>At KidzDraw World, we believe that learning should be fun and interactive, especially for children. This website has been specially designed to help kids explore and understand shapes and colors in a playful, creative way.</p>
          </div>
          <div className='w-[50%] h-full'><img src={images.logo} alt="" className='w-full h-full'/></div>
        </div>
        {/* What makes us special */}
        <div className='bg-whitePink w-[95%] h-[100%] space-y-3 border-4 border-white rounded-3xl'>
          <p className='text-center text-black font-bold text-3xl p-2'>What makes Us Special?</p>
          <div className='w-full h-[80%] flex justify-around items-center'>
            {/* Interactive Learning */}
            <div className='w-[25%] h-[90%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
              <div className='w-full h-[15%] flex justify-around items-center px-1'>
                <img src={images.staremogie} className='w-[20%] h-full' alt="" />
                <p className='font-bold text-sm'>Interactive Learning</p>
              </div>
              <p className='text-center'>
                Kids can create new drawings or enhance existing ones with shapes and colors, sparking endless creativity. Every click unlocks new possibilities for fun and learning.
              </p>
            </div>
            {/* Organized Play */}
            <div className='w-[25%] h-[90%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
              <div className='w-full h-[15%] flex justify-around items-center'>
                <img src={images.colorslogo} alt="" className='w-[20%] h-full'/>
                <p className='font-bold text-sm'>Organized Play</p>
              </div>
              <p className='text-center px-1'>
                Each artwork is beautifully framed to keep the focus on creativity and ensure clarity, making every creation stand out.
              </p>
            </div>
            {/* Parent-Friendly Feature */}
            <div className='w-[25%] h-[90%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
              <div className='w-full h-[15%] flex justify-around items-center'>
                <img src={images.logoparent} alt="" className='w-[20%] h-full' />
                <p className='text-center text-sm font-bold'>Parent-Friendly Feature</p>
              </div>
              <p className='text-center text-xs'>
                Parents can review, lock, and archive their child's drawings, with older archives automatically removed after six months for convenience.
              </p>
            </div>
          </div>
        </div>
        <p className='text-center text-lg px-10'>
          Whether you're a child discovering the magic of art or a parent supporting your little one's journey, KidzDraw World is here to inspire creativity and make learning an exciting adventure.
        </p>
        <p className='text-center text-lg'>
          Let’s learn, create, and grow together!
        </p>
        <div className='flex justify-center items-center w-[50%]'>
          <button className='bg-whitePink p-4 rounded-2xl w-[45%] font-bold mb-4'>Ready to start!</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
