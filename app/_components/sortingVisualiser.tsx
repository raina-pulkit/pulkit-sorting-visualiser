"use client";

import React, { useEffect, useState } from "react";
import ChangeBars from "./changeNumberOfBars";


const SortingVisualiser = ({
  arr,
  setArr,
  numOfBars,
  setNumOfBars
}: {
  arr: Array<number>;
  setArr: any;
  numOfBars: number;
  setNumOfBars: any;
}) => {

  const randGenerator = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (num: number) => {
    var arrNew = new Array(num);
    const bars = [...document.getElementsByClassName("bars")];
    bars.forEach(bar => {
      bar.style.backgroundColor = "black";
    });
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(10, 100);
    setArr(arrNew);
  };

  useEffect(() => {
    resetArray(numOfBars);
  }, [numOfBars]);

  const heightCalc = (num: number, min: number, max: number) =>
    10 + ((num - min) * ((3 * window.innerHeight) / 4 - 10)) / (max - min);

  return (
    <div className="flex flex-col gap-3 justify-end p-2">
      <div className="flex justify-evenly items-end">
        {arr.map((_, ind) => {
          const n = arr.length;
          const gap = n > 100 ? 0 : 5;
          const currWidth = Math.max(
            2,
            Math.min(window.innerWidth / arr.length, 200)
          );

          return (
            <div
              key={ind}
              className={`bg-black bars text-white text-center`}
              style={{
                height: `${heightCalc(_, 10, 100)}px`,
                width: `${currWidth}px`,
              }}
            >
            </div>
          );
        })}
      </div>

      <ChangeBars setNumOfBars={setNumOfBars}/>
    </div>
  );
};

export default SortingVisualiser;
