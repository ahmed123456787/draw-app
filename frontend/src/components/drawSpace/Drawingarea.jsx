import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Star, RegularPolygon } from "react-konva";
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';

function Drawingarea({ selectedShape, ColorShape }) {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [borderSize,setborderSize]=useState(3)
  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    
    setCurrentShape({ x, y, width: 0, height: 0, color: ColorShape });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;

    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();

    setCurrentShape((prev) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y,
    }));
  };

  const handleMouseUp = () => {
    if (currentShape) {
      setShapes([...shapes, { ...currentShape, type: selectedShape }]);
    }
    setCurrentShape(null);
    setIsDrawing(false);
  };

  const renderShape = (shape, key,bs) => {
    const { x, y, width, height, type, color } = shape;
    switch (type) {
      case "Rectangle":
        return <Rect key={key} x={x} y={y} width={width} height={height} fill={color} stroke="black" strokeWidth={borderSize}/>;
      case "Circle":
        return <Circle key={key} x={x + width / 2} y={y + height / 2} radius={Math.abs(width / 2)} fill={color} stroke="black" strokeWidth={bs}/>;
      case "Line":
        return <Line key={key} points={[x, y, x + width, y + height]} stroke={color}  strokeWidth={bs} />;
      case "Star":
        return <Star key={key} x={x + width / 2} y={y + height / 2} numPoints={5} stroke="black" strokeWidth={bs} innerRadius={Math.abs(width / 4)} outerRadius={Math.abs(width / 2)} fill={color} />;
      case "Arrow":
  return (
    <>
      {/* Ligne de la flèche */}
      <Line
        key={key}
        points={[x, y, x + width, y + height]}  // Coordonnées de la ligne
        stroke={ColorShape}  // Couleur de la ligne
        strokeWidth={bs}  // Épaisseur de la ligne
        lineCap="round"  // Cap arrondi pour une ligne plus douce
        lineJoin="round"  // Jointure arrondie pour une transition fluide
      />
    </>
  );

        
      case "Triangle":
        return <RegularPolygon key={key} x={x + width / 2} y={y + height / 2} sides={3} radius={Math.abs(width / 2)} fill={color} stroke="black" strokeWidth={bs}/>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-200 w-[75%] sm:w-[80%] md:w-[80%] lg:w-[85%] h-full flex flex-col items-center justify-evenly">
      <div className="bg-white rounded-xl shadow-xl w-[90%] sm:w-[85%] md:w-[78%] lg:w-[70%] h-[70%] sm:h-[75%] md:h-[80%] lg:h-[85%] flex items-center justify-center">
        <Stage
          width={window.innerWidth * 0.595} // Adjust canvas width to match the container
          height={window.innerHeight * 0.765} // Adjust canvas height to match the container
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: "1px solid", borderRadius: "12px", backgroundColor: "#fffff" }} // Optional styles for the canvas
        >
       
          <Layer>
            {shapes.map((shape, i,borderSize) => renderShape(shape, i,borderSize))}
            {currentShape && renderShape({ ...currentShape, type: selectedShape,borderSize },"current")}
          </Layer>
        </Stage>
      </div>

      {/* Tools Section */}
      <div className="bg-white sm:w-[40%] md:w-[40%] lg:w-[40%] h-[8%] w-[50%] rounded-2xl flex justify-around items-center">
        {/* Eraser */}
        <FaEraser
          className="cursor-pointer text-sm sm:text-xl md:text-2xl lg:text-3xl"
        />
        {/* Pencil Sizes */}
        <GiPencil className={`text-sm sm:text-xl md:text-2xl lg:text-2xl w-10  ${borderSize===3 ? 'bg-gray-300 rounded-lg': ''}`} onClick={()=>{setborderSize(3)}}/>
        <GiPencil className={`text-lg sm:text-2xl md:text-3xl lg:text-3xl w-10 ${borderSize===5 ? 'bg-gray-300 rounded-lg': ''}`} onClick={()=>{setborderSize(5)}}/>
        <GiPencil className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl w-10 ${borderSize=== 8 ? 'bg-gray-300 rounded-lg': ''}`} onClick={()=>{setborderSize(8)}} />
      </div>
    </div>
  );
}

export default Drawingarea;
