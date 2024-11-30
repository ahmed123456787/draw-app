import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import { createRoot } from "react-dom/client";

const ColoredRect = () => {
  const [color, setColor] = useState("green");

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
  };

  return (
    <Rect
      x={20}
      y={20}
      width={50}
      height={50}
      fill={color}
      shadowBlur={5}
      onClick={handleClick}
    />
  );
};

const App = () => {
  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          {rectangles.map((rect, i) => (
            <React.Fragment key={i}>
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="blue"
                shadowBlur={5}
                draggable
                onDragEnd={(e) => handleDragEnd(i, e)}
              />
              {/* Resize handle */}
              <Circle
                x={rect.x + rect.width}
                y={rect.y + rect.height}
                radius={5}
                fill="red"
                draggable={false}
                onMouseDown={() => handleResizeStart(i)}
              />
            </React.Fragment>
          ))}
          {currentRect && (
            <Rect
              x={currentRect.x}
              y={currentRect.y}
              width={currentRect.width}
              height={currentRect.height}
              fill="rgba(0, 0, 255, 0.5)"
              shadowBlur={5}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default App;
