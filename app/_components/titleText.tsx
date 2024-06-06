"use client";
import React, { useEffect } from "react";

const TitleText = () => {
  const handleAnimation = () => {
    const sort = document.getElementById("sorting") as HTMLElement;
    const vis = document.getElementById("visualiser") as HTMLElement;

    const repeat = setInterval(() => {
      let first = "";
      let second = "";
      for (var i = 0; i < 7; i++)
        first =
          first + String.fromCharCode(64 + Math.floor(Math.random() * 25));

      for (var i = 0; i < 10; i++)
        second =
          second + String.fromCharCode(64 + Math.floor(Math.random() * 25));
      sort.innerText = first;
      vis.innerText = second;
    }, 100);

    setTimeout(() => {
      clearInterval(repeat);
      sort.innerText = "SORTING";
      vis.innerText = "VISUALIZER";
    }, 3000);
  };

  useEffect(() => handleAnimation(), []);

  return (
    <div
      className="flex flex-col justify-center text-right select-none tracking-widest"
      onClick={handleAnimation}
    >
      <span className="text-right" id="sorting">
        SORTING
      </span>
      <span className="text-right" id="visualiser">
        VISUALISER
      </span>
    </div>
  );
};

export default TitleText;
