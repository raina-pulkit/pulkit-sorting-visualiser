import React from "react";
import SortingVisualiser from "../_components/sortingVisualiser";
import NavBar from "../_components/navbar";

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <NavBar />
      <SortingVisualiser />
      {children}
    </div>
  );
};

export default RootLayout;
