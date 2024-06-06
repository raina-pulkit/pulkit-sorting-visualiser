"use client";

import { useEffect, useState } from "react";
import { AiFillMerge } from "react-icons/ai";
import { useGlobalContext } from "../utils/globalProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import SideNav from "./sidenav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoPlaySharp } from "react-icons/io5";
import { PiShuffleSimpleFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mergeSort } from "../sortingAlgos/mergeSort";
import { randGenerator, stopAnimations } from "../utils/helperFuncs";
import { bubbleSort } from "../sortingAlgos/bubbleSort";
import { insertionSort } from "../sortingAlgos/insertionSort";
import { selectionSort } from "../sortingAlgos/selectionSort";

const NavBar = () => {
  const {
    setShow,
    num,
    setNum,
    setArr,
    setTimeoutID1,
    setTimeoutID2,
    arr,
    timeoutID1,
    timeoutID2,
  } = useGlobalContext();
  const [scrollY, setScrollY] = useState(0);

  const router = usePathname();
  const path = router;

  // console.log("Path is: ", path);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY < 20)
      (document.getElementById("navbar") as HTMLElement).style.opacity = "100%";
    else
      (document.getElementById("navbar") as HTMLElement).style.opacity = "75%";
  }, [scrollY]);

  const resetArray = () => {
    stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

    var arrNew = new Array(num);
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(10, 100);
    setArr(() => arrNew);
  };

  const helperFuncs = {
    "/merge-sort": mergeSort,
    "/bubble-sort": bubbleSort,
    "/insertion-sort": insertionSort,
    "/selection-sort": selectionSort
  };

  return (
    <>
      <SideNav />
      <motion.nav
        className="text-2xl fixed w-full transition-all duration-200 z-10"
        id="navbar"
        initial={{ opacity: 100 }}
        animate={{ opacity: scrollY < 20 ? 100 : 75 }}
      >
        <motion.div
          className="bg-black mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          initial={{
            height: path === "/" ? 90 : 70,
            opacity: path === "/" ? 0.8 : 0.6,
          }}
          animate={{
            opacity: scrollY < 20 ? 0.8 : 0.6,
            height:
              scrollY < 20 ? (path === "/" ? 90 : 70) : path === "/" ? 80 : 55,
          }}
        >
          <div className="flex-shrink-0 flex gap-2 justify-center items-center">
            <GiHamburgerMenu
              className="text-white mr-10 cursor-pointer hover:scale-95 transition-all duration-100"
              onClick={() => setShow((prev) => !prev)}
            />
            <AiFillMerge color="white" className="h-14 w-10" />
            <div className="text-white text-3xl select-none">
              <Link href={"/"}>
                {path === "/"
                  ? "SORTING ALGORITHM"
                  : `${path.slice(1).toUpperCase()}`}{" "}
                VISUALISER
              </Link>
            </div>
          </div>
          {path !== "/" && (
            <div className="w-1/2 mx-4 flex flex-col">
              <h2 className="text-white text-center">Elements: {num}</h2>
              <input
                type="range"
                value={num}
                min={10}
                max={100}
                step={5}
                onChange={(e) => {
                  stopAnimations(
                    timeoutID1,
                    timeoutID2,
                    setTimeoutID1,
                    setTimeoutID2
                  );
                  setNum(Number(e.target.value));
                }}
              />
            </div>
          )}
          <div className="flex gap-4">
            {path !== "/" && (
              <Button
                className={`py-6 hover:scale-90 hover:opacity-75 transition-all duration-200`}
                size={"icon"}
                onClick={() => resetArray()}
              >
                <PiShuffleSimpleFill size={30} />
              </Button>
            )}
            {path !== "/" && (
              <Button
                className="py-6 hover:scale-90 hover:opacity-75 transition-all duration-200"
                size={"lg"}
                onClick={() => {
                  if (timeoutID1 || timeoutID2)
                    stopAnimations(
                      timeoutID1,
                      timeoutID2,
                      setTimeoutID1,
                      setTimeoutID2
                    );
                  else {
                    if (path === "/merge-sort")
                      helperFuncs[path](
                        timeoutID1,
                        timeoutID2,
                        setTimeoutID1,
                        setTimeoutID2,
                        arr,
                        num
                      );
                    else if (path === "/quick-sort") console.log("HI");
                    else if (path === "/heap-sort") console.log("HI");
                    else if (path === "/bubble-sort")
                      helperFuncs[path](
                        timeoutID1,
                        timeoutID2,
                        setTimeoutID1,
                        setTimeoutID2,
                        arr,
                        num
                      );
                    else if (path === "/insertion-sort")
                      helperFuncs[path](
                        timeoutID1,
                        timeoutID2,
                        setTimeoutID1,
                        setTimeoutID2,
                        arr,
                        num
                      );
                    else if (path === "/selection-sort") helperFuncs[path](
                      timeoutID1,
                      timeoutID2,
                      setTimeoutID1,
                      setTimeoutID2,
                      arr,
                      num
                    );
                    else if (path === "/radix-sort") console.log("HI");
                    else if (path === "/quick-sort") console.log("HI");
                  }
                }}
              >
                <IoPlaySharp size={30} />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
