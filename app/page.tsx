"use client";

import SortingVisualiser from "./_components/sortingVisualiser";
import { useState } from "react";
import NavBar from "./_components/navbar";

export default function Home() {
  const [arr, setArr] = useState(new Array(0));
  const [numOfBars, setNumOfBars] = useState(5);

  return (
    
    <>
      <NavBar arr={arr} setNumOfBars={setNumOfBars} numOfBars={numOfBars} />
      <SortingVisualiser arr={arr} setArr={setArr} numOfBars={numOfBars} setNumOfBars={setNumOfBars}/>
    </>
  );
}
