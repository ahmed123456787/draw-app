import React from 'react';
import { FiHome } from 'react-icons/fi';
import { LuSave } from 'react-icons/lu';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import { CiStar } from 'react-icons/ci';
import ShapeComponent from '../components/drawSpace/ShapeComponent';
import { PiArrowUpRightLight, PiLineVertical } from 'react-icons/pi';
import { FaRegSquare } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';
import { CgShapeRhombus } from 'react-icons/cg';
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';

function DrawSpace() {
  return (
    <div className="h-screen">
      {/* Top Bar */}
      <div className="bg-bgColor w-full h-[12%] sm:h-[12%] md:h-[10%] lg:h-[10%] flex items-center justify-between px-4">
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
          <RiArrowGoBackFill className="bg-purple-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
          <RiArrowGoForwardFill className="bg-pink-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-2 rounded-lg" />
        </div>
      </div>

      {/* Draw Space */}
      <div className="h-[88%] w-full flex">
        {/* Shapes Bar */}
        <div className="w-[10%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-full overflow-y-scroll space-y-10 pt-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ShapeComponent icon={PiLineVertical} label="Line" color="#A10EC0" className="rotate-45" />
          <ShapeComponent icon={PiArrowUpRightLight} label="Arrow" color="#2DCC70" />
          <ShapeComponent icon={CiStar} label="Star" color="rgb(244, 114, 182)" />
          <ShapeComponent icon={FaRegSquare} label="Rectangle" color="#F1C30D" />
          <ShapeComponent icon={IoTriangle} label="Triangle" color="#FF6B6B" />
          <ShapeComponent icon={CgShapeRhombus} label="Rhombus" color="#4ECDC4" />
        </div>

        {/* Draw Paper */}
        <div className="bg-gray-200 w-[80%] sm:w-[78%] md:w-[75%] lg:w-[88%] flex flex-col items-center justify-evenly">
          {/* Drawing Area */}
          <div className="bg-white rounded-xl w-[90%] sm:w-[85%] md:w-[78%] lg:w-[70%] h-[70%] sm:h-[75%] md:h-[80%] lg:h-[85%] shadow-xl"></div>
          
          {/* Tools Section */}
          <div className="bg-white w-[40%] sm:w-[30%] md:w-[20%] lg:w-[15%] h-[7%] rounded-2xl flex justify-around items-center">
            <FaEraser className="text-sm sm:text-xl md:text-2xl lg:text-3xl" />
            <GiPencil className="text-sm sm:text-xl md:text-2xl lg:text-3xl" />
            <GiPencil className="text-base sm:text-2xl md:text-3xl lg:text-4xl" />
            <GiPencil className="text-lg sm:text-3xl md:text-4xl lg:text-5xl" />
          </div>
        </div>

        {/* Color Bar */}
        <div className="w-[10%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-full overflow-y-scroll space-y-10 pt-5 mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="bg-red-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
          <div className="bg-blue-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
          <div className="bg-yellow-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
          <div className="bg-green-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
          <div className="bg-purple-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
          <div className="bg-gray-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default DrawSpace;
