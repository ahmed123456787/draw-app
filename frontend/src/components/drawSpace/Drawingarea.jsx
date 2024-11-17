import React from 'react'
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';
function Drawingarea() {
  return (
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


  )
}

export default Drawingarea
