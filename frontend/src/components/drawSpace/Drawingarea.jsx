import React, { useRef, useState } from 'react';
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';

function DrawingArea() {
  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [pencilSize, setPencilSize] = useState(2); // Default pencil size
  const [isErasing, setIsErasing] = useState(false);

  // Helper function to check if a point is inside a rectangle
  const isPointInRectangle = (point, rectangle) => {
    const { x, y } = point;
    const { x: rectX, y: rectY, width, height } = rectangle;
    return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
  };

  // Start drawing
  const startDrawing = (event) => {
    if (isErasing) return; // Prevent drawing in erase mode
    const { offsetX, offsetY } = event.nativeEvent;
    setStartPoint({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  };

  // Draw rectangle dynamically
  const drawRectangle = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = event.nativeEvent;

    // Clear and redraw all existing rectangles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach(({ x, y, width, height, size }) => {
      ctx.lineWidth = size;
      ctx.strokeRect(x, y, width, height);
    });

    // Draw the rectangle being created
    const width = offsetX - startPoint.x;
    const height = offsetY - startPoint.y;
    ctx.lineWidth = pencilSize;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(startPoint.x, startPoint.y, width, height);
  };

  // Finalize rectangle and store it
  const stopDrawing = (event) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const width = offsetX - startPoint.x;
    const height = offsetY - startPoint.y;

    setRectangles((prev) => [
      ...prev,
      { x: startPoint.x, y: startPoint.y, width, height, size: pencilSize },
    ]);
    setIsDrawing(false);
  };

  // Handle rectangle click for erasing
  const handleCanvasClick = (event) => {
    if (!isErasing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const clickPoint = { x: offsetX, y: offsetY };

    // Find the index of the first rectangle containing the click point
    const rectangleIndex = rectangles.findIndex((rect) =>
      isPointInRectangle(clickPoint, rect)
    );

    if (rectangleIndex === -1) return; // Exit if no rectangle was clicked

    // Remove the selected rectangle from the state
    const updatedRectangles = rectangles.filter((_, index) => index !== rectangleIndex);
    setRectangles(updatedRectangles);

    // Redraw the canvas with remaining rectangles
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatedRectangles.forEach(({ x, y, width, height, size }) => {
      ctx.lineWidth = size;
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x, y, width, height);
    });
  };

  // Clear all rectangles
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRectangles([]);
  };

  return (  
    <div className="bg-gray-200 w-[75%] sm:w-[80%] md:w-[80%] lg:w-[85%] h-full  flex flex-col items-center justify-evenly">
      {/* Drawing Area */}
      <div className="bg-white rounded-xl shadow-xl w-[90%] sm:w-[85%] md:w-[78%] lg:w-[70%] h-[70%] sm:h-[75%] md:h-[80%] lg:h-[85%] flex items-center justify-center">
        
      </div>

      {/* Tools Section */}
      <div className="bg-white sm:w-[40%] md:w-[40%] lg:w-[40%] h-[6%] w-[50%] rounded-2xl flex justify-around items-center">
        <FaEraser
          className={`text-sm sm:text-xl md:text-2xl lg:text-3xl ${isErasing ? 'text-red-500' : ''}`}
          onClick={() => setIsErasing((prev) => !prev)}
        />
        <GiPencil
          className="text-sm sm:text-xl md:text-2xl lg:text-2xl"
          onClick={() => {
            setPencilSize(2);
            setIsErasing(false);
          }}
        />
        <GiPencil
          className="text-lg sm:text-2xl md:text-3xl lg:text-3xl"
          onClick={() => {
            setPencilSize(4);
            setIsErasing(false);
          }}
        />
        <GiPencil
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl"
          onClick={() => {
            setPencilSize(6);
            setIsErasing(false);
          }}
        />

         
      </div>
    </div>
  );
}

export default DrawingArea;
