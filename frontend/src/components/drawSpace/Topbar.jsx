import React from 'react'
import { FiHome } from 'react-icons/fi';
import { LuSave } from 'react-icons/lu';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';

function Topbar() {
    return (

        <div className="bg-bgColor w-full  sm:h-[10%] md:h-[10%] lg:h-[10%] h-[8%] flex items-center justify-between">
            {/* Home Icon */}
            <div className="flex items-center justify-center  sm:w-[10%] md:w-[10%] lg:w-[12%] w-[15%]">
                <FiHome className="bg-white sm:text-3xl md:text-4xl lg:text-4xl text-blue-500 text-3xl p-1 rounded-lg" />
            </div>

            {/* File Name */}
            <div className="flex  items-center justify-start sm:w-[40%] md:w-[50%] lg:w-[58%] w-[50%]">
                <p className="sm:text-xl md:text-2xl lg:text-2xl  text-white ">Untitled File</p>
            </div>
            {/* File Manipulation Buttons */}
            <div className="flex justify-evenly items-center sm:w-[40%] md:w-[40%] lg:w-[30%] w-[40%]">
                <LuSave className="bg-greenColor text-white sm:text-3xl  md:text-4xl lg:text-4xl text-3xl p-1 rounded-lg" />
                <AiOutlineFileAdd className="bg-yellowColor text-white  sm:text-3xl  md:text-4xl lg:text-4xl text-3xl p-1 rounded-lg" />
                <RiArrowGoBackFill ckFill className="bg-purple-400 text-white  sm:text-3xl  md:text-4xl lg:text-4xl text-3xl p-1  rounded-lg" />
                <RiArrowGoForwardFill className="bg-pink-400 text-white  sm:text-3xl  md:text-4xl lg:text-4xl text-3xl p-1 rounded-lg" />
            </div>
        </div>
    )
}

export default Topbar
