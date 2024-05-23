"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AiFillMerge } from "react-icons/ai";
import { sorts } from "./data";

const NavBar = ({ arr, setArr }: { arr: Array<number>; setArr: any }) => {
  const [visible, setVisible] = useState(true);  

  return (
    <nav className="bg-black text-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex gap-2 justify-center items-center">
              <AiFillMerge color="white" className="h-10 w-10" />
              <div className="text-white text-2xl">
                Sorting Algorithm Visualiser
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {sorts.map((obj, ind) => (
                <button
                  onClick={() => obj["function"](arr)}
                  className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  key={ind}
                >
                  {obj["name"]}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setVisible((prev) => !prev)}
            >
              {!visible ? <Menu /> : <X />}
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {sorts.map((obj, ind) => (
              <button
                onClick={() => obj["function"](arr)}
                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                key={ind}
              >
                {obj["name"]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
