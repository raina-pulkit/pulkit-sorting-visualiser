"use client";

import React, { useEffect } from "react";
import { useGlobalContext } from "../utils/globalProvider";
import FileUpload from "./fileUpload";
import { heightCalc, randGenerator } from "../utils/helperFuncs";

const SortingVisualiser = () => {
  const { arr, setArr, num, setNum } = useGlobalContext();

  const resetArray = () => {
    var arrNew = new Array(num);
    const bars = Array.from(
      document.getElementsByClassName("bars")
    ) as Array<HTMLDivElement>;
    bars.forEach((bar) => {
      bar.style.backgroundColor = "slate";
    });
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(10, 100);
    setArr(() => arrNew);
  };

  const resetArrayTo = () => {
    const bars = Array.from(
      document.getElementsByClassName("bars")
    ) as Array<HTMLDivElement>;
    bars.forEach((bar) => {
      bar.style.backgroundColor = "slate";
    });
    setNum(() => arr.length);
  };
  let innerWidth = window.innerWidth;

  useEffect(() => {
    resetArray();
  }, [num, setArr]);

  useEffect(() => {
    resetArrayTo();
  }, [arr, setNum]);

  return (
    <div className="flex flex-col gap-6 justify-end items-center p-2 overflow-x-hidden px-5">
      <div className="flex justify-evenly items-end">
        {arr.map((_, ind) => {
          const n = arr.length;
          const gap = n > 100 ? 0 : 5;
          const currWidth = Math.max(2, Math.min(innerWidth / arr.length, 200));

          let arrMin = 1e9,
            arrMax = 0;
          arr.forEach((el) => {
            arrMin = Math.min(arrMin, el);
            arrMax = Math.max(arrMax, el);
          });

          return (
            <div
              key={ind}
              className={`bars select-none text-center rounded-md border-[#6360aa] border-${
                num > 40 ? (num > 60 ? 0 : 1) : 4
              } flex justify-center items-end text-black bg-white font-extrabold`}
              style={{
                height: `${heightCalc(
                  _,
                  arrMin,
                  arrMax,
                  10,
                  (3 * window.innerHeight) / 4
                )}px`,
                width: `${currWidth}px`,
              }}
            >
              {num < 60 && <h1 className="heightText">{_}</h1>}
            </div>
          );
        })}
      </div>

      <div className="w-96">
        <FileUpload />
      </div>
    </div>
  );
};

export default SortingVisualiser;
