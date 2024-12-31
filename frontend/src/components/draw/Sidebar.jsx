import React,{useState} from 'react';
import ShapeComponent from './ShapeComponent';
import { CiStar } from 'react-icons/ci';
import { PiArrowUpRightLight, PiLineVertical } from 'react-icons/pi';
import { FaRegSquare } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';
import { CgShapeRhombus } from 'react-icons/cg';
import { FaCircle } from "react-icons/fa";

function Sidebar({ setSelectedShape }) {
    const [isActiveShape,setActiveShape]=useState("");
  const shapes = [
    { label: "Line", icon: PiLineVertical, color: "#A10EC0" },
    { label: "Arrow", icon: PiArrowUpRightLight, color: "#2DCC70" },
    { label: "Star", icon: CiStar, color: "rgb(244, 114, 182)" },
    { label: "Rectangle", icon: FaRegSquare, color: "#F1C30D" },
    { label: "Triangle", icon: IoTriangle, color: "#FF6B6B" },
    { label: "Rhombus", icon: CgShapeRhombus, color: "#4ECDC4" },
    { label: "Circle", icon: FaCircle, color: "#3498D8" },
  ];

  return (
    <div
      className="sm:w-[10%] md:w-[10%] lg:w-[8%] w-[15%] h-full overflow-y-scroll space-y-10 pt-5"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}
    >
      {shapes.map((shape) => (
        <div
          key={shape.label}
          onClick={() => {setSelectedShape(shape.label);setActiveShape(shape.label)}}
          style={{ cursor: 'pointer' }}
        >
          <ShapeComponent
            icon={shape.icon}
            label={shape.label}
            color={shape.color}
            isActiveShape={isActiveShape}            
          />
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
