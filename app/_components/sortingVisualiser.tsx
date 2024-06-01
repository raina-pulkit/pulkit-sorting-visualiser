"use client";

import React, { useEffect } from "react";
import ChangeBars from "./changeNumberOfBars";
import { useGlobalContext } from "../utils/globalProvider";
import FileUpload from "./fileUpload";

const SortingVisualiser = () => {
  const {
    arr,
    setArr,
    num,
    setNum,
    timeoutID1,
    timeoutID2,
    setTimeoutID1,
    setTimeoutID2,
  } = useGlobalContext();

  const randGenerator = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (num: number) => {
    var arrNew = new Array(num);
    const bars = Array.from(
      document.getElementsByClassName("bars")
    ) as Array<HTMLDivElement>;
    bars.forEach((bar) => {
      bar.style.backgroundColor = "slate";
    });
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(10, 100);
    setArr(arrNew);
  };

  const resetArrayTo = (given: number[]) => {
    var arrNew = new Array(num);
    const bars = Array.from(
      document.getElementsByClassName("bars")
    ) as Array<HTMLDivElement>;
    bars.forEach((bar) => {
      bar.style.backgroundColor = "slate";
    });
    for (var i = 0; i < num; i++) arrNew[i] = given[i];
    setArr(arrNew);
  }

  useEffect(() => {
    resetArray(num);
  }, [num]);

  const heightCalc = (num: number, min: number, max: number) =>
    10 + ((num - min) * ((3 * window.innerHeight) / 4 - 10)) / (max - min);

  return (
    <div className="flex flex-col gap-10 justify-end p-2">
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
              className={`bg-slate-600 bars`}
              style={{
                height: `${heightCalc(_, 10, 100)}px`,
                width: `${currWidth}px`,
              }}
            ></div>
          );
        })}
      </div>

      <div className="flex justify-center gap-10 items-center">
        <ChangeBars
          setNum={setNum}
          timeoutID1={timeoutID1}
          timeoutID2={timeoutID2}
          setTimeoutID1={setTimeoutID1}
          setTimeoutID2={setTimeoutID2}
        />
        <h1 className="font-extrabold text-white text-3xl">OR</h1>
        <FileUpload />
      </div>
    </div>
  );
};

export default SortingVisualiser;
