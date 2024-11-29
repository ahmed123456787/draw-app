import React, { useEffect, useRef, useState } from 'react';
import { FaEraser } from 'react-icons/fa';
import { GiPencil } from 'react-icons/gi';

function DrawingArea() {
  const fabric = require('fabric').fabric;
  const canvasRef = useRef(null); // Référence pour le conteneur du canevas
  const [fabricCanvas, setFabricCanvas] = useState(null); // Instance de Fabric.js
  const [brushSize, setBrushSize] = useState(5); // Taille du pinceau
  const [isEraser, setIsEraser] = useState(false); 

  useEffect(() => {
    if (canvasRef.current) {
      // Initialiser le canevas Fabric.js
      const canvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true, // Activer le mode dessin
      });
      canvas.freeDrawingBrush.width = brushSize; // Définir la taille du pinceau
      canvas.freeDrawingBrush.color = '#000000'; // Couleur initiale du pinceau

      setFabricCanvas(canvas);

      // Nettoyer l'instance de Fabric.js au démontage du composant
      return () => {
        canvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = brushSize; // Mettre à jour la taille du pinceau
    }
  }, [brushSize]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = isEraser ? '#ffffff' : '#000000'; // Blanc pour effacer
    }
  }, [isEraser]);

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  return (
    <div className="bg-gray-200 w-[75%] sm:w-[80%] md:w-[80%] lg:w-[85%] h-full flex flex-col items-center justify-evenly">
      {/* Drawing Area */}
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] sm:w-[85%] md:w-[78%] lg:w-[70%] h-[70%] sm:h-[75%] md:h-[80%] lg:h-[85%] flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          width="800" // Largeur du canevas
          height="600" // Hauteur du canevas
        ></canvas>
      </div>

      {/* Tools Section */}
      <div className="bg-white sm:w-[40%] md:w-[40%] lg:w-[40%] h-[6%] w-[50%] rounded-2xl flex justify-around items-center">
        {/* Eraser */}
        <FaEraser
          onClick={toggleEraser}
          className={`cursor-pointer text-sm sm:text-xl md:text-2xl lg:text-3xl ${
            isEraser ? 'text-red-500' : ''
          }`}
        />
        {/* Pencil Sizes */}
        {[2, 5, 10, 15].map((size, index) => (
          <GiPencil
            key={index}
            onClick={() => setBrushSize(size)}
            className={`cursor-pointer text-sm sm:text-xl md:text-2xl lg:text-3xl ${
              brushSize === size ? 'text-blue-500' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default DrawingArea;
