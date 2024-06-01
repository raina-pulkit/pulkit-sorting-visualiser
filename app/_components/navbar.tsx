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
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const { setShow } = useGlobalContext();
  const [scrollY, setScrollY] = useState(0);

  const router = usePathname();
  const path = router;

  console.log("Path is: ", path);

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

  return (
    <>
      <SideNav />
      <nav
        className="bg-black text-2xl fixed w-full transition-all duration-200 z-10"
        id="navbar"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex gap-2 justify-center items-center">
            <GiHamburgerMenu
              className="text-white mr-10 cursor-pointer hover:scale-95 transition-all duration-100"
              onClick={() => setShow((prev) => !prev)}
            />
            <AiFillMerge color="white" className="h-14 w-10" />
            <div className="text-white text-3xl select-none">
              <Link href={"/"}>Sorting Algorithm Visualiser</Link>
            </div>
          </div>
          <div className="flex gap-4">
            {path !== "/" && (
              <Button className="py-6 hover:scale-90 hover:opacity-75 transition-all duration-200">
                <PiShuffleSimpleFill size={30} />
              </Button>
            )}
            {path !== "/" && (
              <Button className="py-6 hover:scale-90 hover:opacity-75 transition-all duration-200">
                <IoPlaySharp size={30} />
              </Button>
            )}
          </div>
        </div>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
