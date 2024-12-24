import React from "react";
import images from "./../../assets/assets";

const AboutUsSection = () => {
    return (
        <>
            {/* About Us section */}
            <div
                id="about-us"
                className="w-[70%] h-[225vh] border-1 flex flex-col justify-start items-center bg-whiteBlueColor mt-40 border-4 border-white rounded-3xl"
            >
                <p className="text-3xl text-black font-bold p-4">Welcome to KidzDraw World</p>
                <p className="text-gray-400 text-xl font-bold">Where Fun Shapes Bright Minds!</p>

                {/* Our Purpose */}
                <div className="flex flex-col lg:flex-row justify-between items-center w-[95%] my-6">
                    <div className="lg:w-[70%] text-center">
                        <p className="text-3xl text-black font-bold">Our Purpose</p>
                        <p className="text-gray-600 mt-4">
                            At KidzDraw World, we believe learning should be fun and interactive, especially for children.
                            This website helps kids explore shapes and colors in a playful and creative way,
                            blending education with entertainment.
                        </p>
                    </div>
                    <div className="lg:w-[50%] h-auto mt-6 lg:mt-0">
                        <img
                            src={images.logo}
                            alt="KidzDraw Logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* What Makes Us Special */}
                <div className="bg-whitePink w-[95%] h-[50%] py-6 px-4 space-y-6 border-4 border-white rounded-3xl">
                    <p className="text-center text-black font-bold text-3xl">
                        What Makes Us Special?
                    </p>
                    <div className="w-full h-[80%]  flex  justify-around  ">

                        {/* Interactive Learning */}
                        <div className='w-[25%] h-[100%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
                            <div className='w-full h-[15%] flex justify-around items-center px-1'>
                                <img src={images.staremogie} className='w-[20%] h-full' alt="" />
                                <p className='font-bold text-sm'>Interactive Learning</p>
                            </div>
                            <p className='text-center'>
                                Kids can create new drawings or enhance existing ones with shapes and colors, sparking endless creativity. Every click unlocks new possibilities for fun and learning.
                            </p>
                        </div>
                        {/* Organized Play */}
                        <div className='w-[25%] h-[100%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
                            <div className='w-full  flex justify-around items-center'>
                                <img src={images.colorslogo} alt="" className='w-[20%] h-full' />
                                <p className='font-bold text-sm'>Organized Play</p>
                            </div>
                            <p className='text-center px-1 '>
                            Each artwork is beautifully framed to keep the focus on creativity and ensure clarity, making every creation stand out.
                            </p>
                        </div>
                        {/* Parent-Friendly Feature */}
                        <div className='w-[25%] h-[100%] bg-whiteBlueColor flex-col space-y-2 rounded-xl'>
                            <div className='w-full h-[15%] flex justify-around items-center'>
                                <img src={images.logoparent} alt="" className='w-[20%] h-full' />
                                <p className='text-center text-sm font-bold'>Parent-Friendly Feature</p>
                            </div>
                            <p className='text-center'>
                                Parents can review, lock, and archive their child's drawings, with older archives automatically removed after six months for convenience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Inspirational Message */}
                <p className="text-center text-lg mt-6 px-10 text-gray-700">
                    Whether you're a child discovering the magic of art or a parent supporting your little one's journey,
                    KidzDraw World is here to inspire creativity and make learning an exciting adventure.
                </p>
                <p className="text-center text-lg text-gray-700 mt-2">
                    Let’s learn, create, and grow together!
                </p>

                {/* Call-to-Action */}
                <div className="flex justify-center items-center w-[50%] mt-6">
                    <button className="bg-whitePink p-4 rounded-2xl mb-5 w-[45%] font-bold text-black">
                        Ready to start!
                    </button>
                </div>
            </div>

        </>
    );
};

export default AboutUsSection;
