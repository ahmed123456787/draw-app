import React from 'react'
import { FiHome } from 'react-icons/fi';
import { LuSave } from 'react-icons/lu';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';

function Topbar() {
    return (

        <div className="bg-bgColor w-full h-[12%] sm:h-[12%] md:h-[10%] lg:h-[10%] flex items-center justify-between p-10">
            {/* Home Icon */}
            <div className="flex items-center justify-center w-[15%] sm:w-[12%] md:w-[10%] lg:w-[8%]">
                <FiHome className="bg-white text-blue-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
            </div>

            {/* File Name */}
            <div className="flex items-center justify-start w-[35%] sm:w-[40%] md:w-[50%] lg:w-[60%]">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white">Untitled File</p>
            </div>

            {/* File Manipulation Buttons */}
            <div className="flex justify-evenly items-center w-[50%] sm:w-[40%] md:w-[35%] lg:w-[30%]">
                <LuSave className="bg-greenColor text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
                <AiOutlineFileAdd className="bg-yellowColor text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
                <RiArrowGoBackFill ckFill className="bg-purple-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
                <RiArrowGoForwardFill className="bg-pink-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
            </div>
        </div>

    )
}

export default Topbar
