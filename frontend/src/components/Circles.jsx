import React from "react";
import "./Circles.css";

const Circles = ({ size, offsetX, offsetY }) => {
  // Calculate sizes for the inner circles
  const largeSize = size * 0.7;
  const mediumSize = size * 0.5;
  const smallSize = size * 0.3;

  return (
    <div
      className="circle-outer"
      style={{
        width: size,
        height: size,
        position: "absolute",
        transform: `translate(${offsetX}, ${offsetY})`,
      }}
    >
      <div
        className="circle large"
        style={{
          width: largeSize,
          height: largeSize,
          borderRadius: "50%",
          position: "absolute",
          top: "15%",
          left: "15%",
        }}
      />
      <div
        className="circle medium"
        style={{
          width: mediumSize,
          height: mediumSize,
          borderRadius: "50%",
          position: "absolute",
          top: "25%",
          left: "25%",
        }}
      />
      <div
        className="circle small"
        style={{
          width: smallSize,
          height: smallSize,
          borderRadius: "50%",
          position: "absolute",
          top: "35%",
          left: "35%",
        }}
      />
    </div>
  );
};

export default Circles;
