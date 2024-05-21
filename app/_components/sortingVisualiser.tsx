"use client";

import React, { useCallback, useEffect, useState } from "react";

const SortingVisualiser = () => {
  const [arr, setArr] = useState(new Array(0));

  const randGenerator = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (num: number) => {
    var arrNew = new Array(num);
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(5, 100);
    setArr(arrNew);
  };

  useEffect(() => {
    resetArray(10);
  }, []);

  return (
    <div className="flex flex-col">
      {arr.map((_, ind) => (
        <div key={ind}>{_ + `\n`}</div>
      ))}
    </div>
  );
};

export default SortingVisualiser;
