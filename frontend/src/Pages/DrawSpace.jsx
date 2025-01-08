import React, { useState, useRef } from "react";
import Topbar from "../components/draw/Topbar";
import Sidebar from "../components/draw/Sidebar";
import Drawingarea from "../components/draw/Drawingarea";
import Colorbar from "../components/draw/Colorbar";
import { useParams } from "react-router-dom";
import { useUpdateDrawMutation } from "../services/childApi";
import { useSelector } from "react-redux";
import { drawApi } from "../services/drawApi";
function DrawSpace() {
  const { id } = useParams();
  const [selectedShape, setSelectedShape] = useState("Rectangle"); // Default shape
  const [ColorShape, setColorShape] = useState("white"); // default color
  const [updateDraw, { isLoading: isUpdateLoading }] = useUpdateDrawMutation();

  const [shapes, setShapes] = useState([]);
  const stageRef = useRef(null);

  const handleSave = async () => {
    const image = stageRef.current.toDataURL();

    const content = {
      id: id,
      draw_content: {
        content: shapes,
      },
      image: image,
    };
    await updateDraw(content).unwrap();
    return content;
  };
  return (
    <div className="h-screen">
      {/* Top Bar */}
      <Topbar handlesave={handleSave} />
      {/* Draw Space */}
      <div className="sm:h-[90%] md:h-[90%]  lg:h-[90%] h-[100%] flex">
        {/* Side Bar */}
        <Sidebar setSelectedShape={setSelectedShape} />
        {/* Draw Paper */}
        <Drawingarea
          selectedShape={selectedShape}
          ColorShape={ColorShape}
          setShapes={setShapes}
          shapes={shapes}
          stageRef={stageRef}
        />
        {/* Color Bar */}
        <Colorbar setColorShape={setColorShape} />
      </div>
    </div>
  );
}

export default DrawSpace;
