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
      width={500}
      height={2000}
      fill={color}
      shadowBlur={5}
      onClick={handleClick}
    />
  );
};

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try click on rect" />
        <ColoredRect />
      </Layer>
    </Stage>
  );
};

// createRoot(<App />, document.getElementById("root"));
export default App;
