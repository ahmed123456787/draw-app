import React, { useState } from 'react';
import Topbar from '../components/drawSpace/Topbar';
import Sidebar from '../components/drawSpace/Sidebar';
import Drawingarea from '../components/drawSpace/Drawingarea';
import Colorbar from '../components/drawSpace/Colorbar';

function DrawSpace() {
  const [selectedShape, setSelectedShape] = useState("Rectangle"); // Default shape
  const [ColorShape,setColorShape]=useState("white");// default color
  
  const [shapes, setShapes] = useState([]);
  const handleSave = () => {
    const stageData = {
      shapes: shapes, // Les shapes actuels
    };   
    const stageJson = JSON.stringify(stageData);
    console.log(stageJson)
  }
    
  return (
    <div className="h-screen">
      {/* Top Bar */}
      <Topbar handlesave={handleSave}/>
      {/* Draw Space */}
      <div className="sm:h-[90%] md:h-[90%]  lg:h-[90%] h-[100%] flex">
        {/* Side Bar */}
        <Sidebar setSelectedShape={setSelectedShape} />
        {/* Draw Paper */}
        <Drawingarea selectedShape={selectedShape} ColorShape={ColorShape} setShapes={setShapes} shapes={shapes} />
        {/* Color Bar */}
        <Colorbar setColorShape={setColorShape}/>
      </div>
    </div>
  );
}

export default DrawSpace;
