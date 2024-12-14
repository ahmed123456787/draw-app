import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Star, RegularPolygon } from "react-konva";
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';

function Drawingarea({ selectedShape, ColorShape,setShapes,shapes }) {
  const [currentShape, setCurrentShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [borderSize, setborderSize] = useState(2)
  const [isEraserActive, setIsEraserActive] = useState(false);
  
  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    if (isEraserActive) return; 
    setCurrentShape({ x, y, width: 0, height: 0, color: ColorShape,borderSize });
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
      // Ajoutez la nouvelle forme à l'état `shapes`
      setShapes((prevShapes) => [...prevShapes, { ...currentShape, type: selectedShape, borderSize }]);
    }
    setCurrentShape(null);
    setIsDrawing(false);
  };
  

  const renderShape = (shape, key) => {
    const { x, y, width, height, type, color,borderSize } = shape;

    const handleClick = () => {
      if (isEraserActive) {
        setShapes((prevShapes) => prevShapes.filter((_, index) => index !== key));
      }
    };
    const handleDragStart = () => {
      setIsDrawing(false); 
    };
    const handleDragEnd = (e) => {
      const { x, y } = e.target.position();
      setShapes((prevShapes) =>
        prevShapes.map((s, index) =>
          index === key ? { ...s, x, y } : s
        )
        
      );
      setIsDrawing(true);
    };

    switch (type) {
      case "Rectangle":
        return <Rect key={key} x={x} y={y} width={width} height={height} fill={color} stroke="black" strokeWidth={borderSize} onClick={handleClick} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />;
      case "Circle":
        return <Circle key={key} x={x + width / 2} y={y + height / 2} radius={Math.abs(width / 2)} fill={color} stroke="black" strokeWidth={borderSize} onClick={handleClick} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />;
      case "Line":
        return <Line key={key} points={[x, y, x + width, y + height]} stroke={color} strokeWidth={borderSize} onClick={handleClick} onDragStart={handleDragStart}  onDragEnd={handleDragEnd}  />;
      case "Star":
        return <Star key={key} x={x + width / 2} y={y + height / 2} numPoints={5} stroke="black" strokeWidth={borderSize} innerRadius={Math.abs(width / 4)} outerRadius={Math.abs(width / 2)} fill={color} onClick={handleClick} onDragStart={handleDragStart}  onDragEnd={handleDragEnd} />;
      case "Triangle":
        return <RegularPolygon key={key} x={x + width / 2} y={y + height / 2} sides={3} radius={Math.abs(width / 2)} fill={color} stroke="black" strokeWidth={borderSize} onClick={handleClick} onDragStart={handleDragStart}  onDragEnd={handleDragEnd}/>;
      default:
        return null;
    }
  };


  return (
    <div className="bg-gray-200 w-[75%] sm:w-[80%] md:w-[80%] lg:w-[85%] h-full flex flex-col items-center justify-evenly">
      <div className="bg-white rounded-xl shadow-xl w-[90%] sm:w-[85%] md:w-[78%] lg:w-[70%] h-[70%] sm:h-[75%] md:h-[80%] lg:h-[85%] flex items-center justify-center">
        <Stage
          width={window.innerWidth * 0.595} 
          height={window.innerHeight * 0.765} 
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: "1px solid", borderRadius: "12px", backgroundColor: "#fffff" }} 
        >

          <Layer>
            {shapes.map((shape, i, borderSize) => renderShape(shape, i, borderSize))}
            {currentShape && renderShape({ ...currentShape, type: selectedShape, borderSize }, "current")}
          </Layer>
        </Stage>
      </div>

      {/* Tools Section */}
      <div className="bg-white sm:w-[40%] md:w-[40%] lg:w-[40%] h-[8%] w-[50%] rounded-2xl flex justify-around items-center">
        {/* Eraser */}
        <FaEraser
          className={`cursor-pointer text-sm sm:text-xl md:text-2xl lg:text-3xl ${isEraserActive ? 'bg-gray-300 rounded-lg' : ''}`}
          onClick={() => { setIsEraserActive(!isEraserActive)}}
        />

        {/* Pencil Sizes */}<GiPencil
          className={`text-sm sm:text-xl md:text-2xl lg:text-2xl w-10 ${borderSize === 3 &&isEraserActive==false ? 'bg-gray-300 rounded-lg' : ''}`}
          onClick={() => {
            setborderSize(3);
            if(borderSize==3){
              setborderSize(2)
            }
            if (isEraserActive) {
              setIsEraserActive(false);
            }
          }}  
        />
        <GiPencil
          className={`text-lg sm:text-2xl md:text-3xl lg:text-3xl w-10 ${borderSize === 4 &&isEraserActive==false ? 'bg-gray-300 rounded-lg' : ''}`}
          onClick={() => {
            setborderSize(4);
            if(borderSize==4){
              setborderSize(2)
            }
            if (isEraserActive) {
              setIsEraserActive(false);
            }
          }}
        />
        <GiPencil
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl w-10 ${borderSize === 7 &&isEraserActive==false ? 'bg-gray-300 rounded-lg' : ''}`}
          onClick={() => {
            setborderSize(7);
            if(borderSize==7){
              setborderSize(2)
            }
            if (isEraserActive) {
              setIsEraserActive(false);
            }
          }}
        />

      </div>
    </div>
  );
}

export default Drawingarea;
