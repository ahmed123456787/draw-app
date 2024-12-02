import React, { useState } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

const App = () => {
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState(null);
  const [resizeIndex, setResizeIndex] = useState(null);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();

    // Check if we are resizing
    if (resizeIndex !== null) return;
    // Start drawing a new rectangle
    setCurrentRect({ x, y, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const stage = e.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setCurrentRect((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          width: x - prev.x,
          height: y - prev.y,
        };
      });
    }
    if (resizeIndex !== null) {
      const stage = e.target.getStage();
      const { x, y } = stage.getPointerPosition();
      setRectangles((prev) =>
        prev.map((rect, i) =>
          i === resizeIndex
            ? {
                ...rect,
                width: Math.max(10, x - rect.x),
                height: Math.max(10, y - rect.y),
              }
            : rect
        )
      );
    }
  };
  const handleMouseUp = () => {
    if (isDrawing) {
      setRectangles((prev) => [...prev, { ...currentRect, draggable: true }]);
      setCurrentRect(null);
      setIsDrawing(false);
    }
    setResizeIndex(null);
  };
  const handleDragEnd = (index, e) => {
    const { x, y } = e.target.position();
    setRectangles((prev) =>
      prev.map((rect, i) => (i === index ? { ...rect, x, y } : rect))
    );
  };
  const handleResizeStart = (index) => {
    setResizeIndex(index);
  };

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