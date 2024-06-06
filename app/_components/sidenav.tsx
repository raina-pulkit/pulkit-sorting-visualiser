"use client";
import React from "react";
import { useGlobalContext } from "../utils/globalProvider";
import { motion } from "framer-motion";
import SideNavContent from "./sideNavContent";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SideNav = () => {
  const { show, setShow } = useGlobalContext();

  return (
    <motion.div
      className={`fixed top-0 left-0 bg-white h-screen overflow-scroll z-20`}
      id="sidenav"
      initial={{ width: 0 }}
      animate={{ width: show ? 350 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <SideNavContent />
      <Button
        variant={"ghost"}
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-5 right-5 text-white"
      >
        <X />
      </Button>
    </motion.div>
  );
};

export default SideNav;
