"use client";

import SortingVisualiser from "./_components/sortingVisualiser";
import { useState } from "react";
import NavBar from "./_components/navbar";

export default function Home() {
  const [arr, setArr] = useState(new Array(0));

  return (
    <>
      <NavBar arr={arr} setArr={setArr} />
      <SortingVisualiser arr={arr} setArr={setArr} />
    </>
  );
}
