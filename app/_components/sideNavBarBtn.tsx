"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useGlobalContext } from "../utils/globalProvider";

const SideNavBarBtn = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) => {
  const { setShow } = useGlobalContext();

  return (
    <Button className={`${styles} `} onClick={() => setShow((prev) => !prev)}>
      {children}
    </Button>
  );
};

export default SideNavBarBtn;
