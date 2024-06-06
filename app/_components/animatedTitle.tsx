import React from "react";
import TitleText from "./titleText";

const AnimatedTitle = () => {
  return (
    <div className="container h-screen text-white font-extrabold text-8xl relative">
      <div className="h-[300px] absolute top-28 right-32 flex items-center gap-5">
        <TitleText />
        <div className="h-full w-2 bg-orange-500"></div>
      </div>
    </div>
  );
};

export default AnimatedTitle;
