import React, { useEffect, useRef } from "react";

const MyShape = () => {
  const circleRef = useRef();

  useEffect(() => {
    // log Konva.Circle instance
    console.log(circleRef.current);
  }, []);

  return <Circle ref={circleRef} radius={50} fill="black" />;
};
