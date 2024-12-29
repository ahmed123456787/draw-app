import React from "react";
import images from "../../assets/assets";
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate=useNavigate()
    return (
        <>
            {/* About Us section */}
            <div
                id="about-us"
                className="w-[90%] lg:w-[70%] lg:h-[225vh] flex flex-col justify-start items-center bg-whiteBlueColor mt-20 border-4 border-white rounded-3xl"
            >
                <p className="lg:text-3xl text-xl text-black font-bold p-4">Welcome to KidzDraw World</p>
                <p className="text-gray-400 lg:text-xl text-base font-bold">Where Fun Shapes Bright Minds!</p>

                {/* Our Purpose */}
                <div className="flex flex-col lg:flex-row justify-between items-center w-[95%] my-6">
                    <div className="lg:w-[60%] text-center mb-6 lg:mb-0">
                        <p className="lg:text-3xl text-xl text-black font-bold">Our Purpose</p>
                        <p className="text-gray-600 mt-2 p-2">
                            At KidzDraw World, we believe learning should be fun and interactive, especially for children.
                            This website helps kids explore shapes and colors in a playful and creative way,
                            blending education with entertainment.
                        </p>
                    </div>
                    <div className="lg:w-[30%] h-auto">
                        <img
                            src={images.logo}
                            alt="KidzDraw Logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* What Makes Us Special */}
                <div className="bg-whitePink w-[95%] lg:h-[100vh] py-6 px-4 space-y-6 border-4 border-white rounded-3xl">
                    <p className="text-center text-black font-bold lg:text-3xl text-xl">
                        What Makes Us Special?
                    </p>
                    <div className="w-full lg:h-[80%] flex flex-wrap justify-around items-center space-y-5 lg:space-y-0">

                        {/* Interactive Learning */}
                        <div className='lg:w-[30%] w-[90%] lg:h-[90%] bg-whiteBlueColor flex flex-col space-y-2 rounded-xl p-4'>
                            <div className='flex justify-center items-center space-x-2'>
                                <img src={images.staremogie} className='w-[20%] h-auto' alt="" />
                                <p className='font-bold text-center text-sm lg:text-lg'>Interactive Learning</p>
                            </div>
                            <p className='text-center text-gray-600'>
                                Kids can create new drawings or enhance existing ones with shapes and colors, sparking endless creativity. Every click unlocks new possibilities for fun and learning.
                            </p>
                        </div>

                        {/* Organized Play */}
                        <div className='lg:w-[30%] w-[90%] lg:h-[90%]  bg-whiteBlueColor flex flex-col space-y-2 rounded-xl p-4'>
                            <div className='flex justify-center items-center space-x-2'>
                                <img src={images.colorslogo} alt="" className='w-[20%] h-auto' />
                                <p className='font-bold text-center text-sm lg:text-lg'>Organized Play</p>
                            </div>
                            <p className='text-center text-gray-600'>
                                Each artwork is beautifully framed to keep the focus on creativity and ensure clarity, making every creation stand out.
                            </p>
                        </div>

                        {/* Parent-Friendly Feature */}
                        <div className='lg:w-[30%] w-[90%] lg:h-[90%] bg-whiteBlueColor flex flex-col space-y-2 rounded-xl p-4'>
                            <div className='flex justify-center items-center space-x-1'>
                                <img src={images.logoparent} alt="" className='w-[20%] h-auto' />
                                <p className='font-bold text-center text-sm lg:text-lg'>Parent-Friendly Feature</p>
                            </div>
                            <p className='text-center text-gray-600'>
                                Parents can review, lock, and archive their child's drawings, with older archives automatically removed after six months for convenience.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Inspirational Message */}
                <p className="text-center lg:text-lg text-base mt-6 px-6 text-gray-700">
                    Whether you're a child discovering the magic of art or a parent supporting your little one's journey,
                    KidzDraw World is here to inspire creativity and make learning an exciting adventure.
                </p>
                <p className="text-center lg:text-lg text-base px-4 text-gray-700 mt-2">
                    Let’s learn, create, and grow together!
                </p>

                {/* Call-to-Action */}
                <div className="flex justify-center items-center w-[80%] lg:w-[50%] mt-6">
                    <button className="bg-whitePink py-4 px-6 rounded-2xl mb-5 w-[70%] lg:w-[50%] text-base lg:text-xl font-bold text-black" onClick={()=>{navigate('/sign-in')}}>
                        Ready to start!
                    </button>
                </div>
            </div>
        </>
    );
};

export default About;
