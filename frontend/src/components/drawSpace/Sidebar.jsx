import React from 'react'
import ShapeComponent from './ShapeComponent';
import { CiStar } from 'react-icons/ci';
import { PiArrowUpRightLight, PiLineVertical } from 'react-icons/pi';
import { FaRegSquare } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';
import { CgShapeRhombus } from 'react-icons/cg';

function Sidebar() {
    return (
        <div className="w-[10%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-full overflow-y-scroll space-y-10 pt-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <ShapeComponent icon={PiLineVertical} label="Line" color="#A10EC0" className="rotate-45" />
            <ShapeComponent icon={PiArrowUpRightLight} label="Arrow" color="#2DCC70" />
            <ShapeComponent icon={CiStar} label="Star" color="rgb(244, 114, 182)" />
            <ShapeComponent icon={FaRegSquare} label="Rectangle" color="#F1C30D" />
            <ShapeComponent icon={IoTriangle} label="Triangle" color="#FF6B6B" />
            <ShapeComponent icon={CgShapeRhombus} label="Rhombus" color="#4ECDC4" />
        </div>

    )
}

export default Sidebar
