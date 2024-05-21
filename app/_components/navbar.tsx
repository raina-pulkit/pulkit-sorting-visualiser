"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const NavBar = () => {
  const [visible, setVisible] = useState(true);

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-white">
                Sorting Algorithm Visualiser
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/"
                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Merge Sort
              </a>
              <a
                href="/"
                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Bogo Sort
              </a>
              <a
                href="/"
                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Quick Sort
              </a>
              <a
                href="/"
                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Bubble Sort
              </a>
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
      {visible && 
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
                href="/"
                className="block text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Link 2
              </a>
              <a
                href="/"
                className="block text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Link 3
              </a>
              <a
                href="/"
                className="block text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Link 4
              </a>
              <a
                href="/"
                className="block text-white hover:bg-white hover:text-black rounded-lg p-2"
              >
                Link 5
              </a>
          </div>
        </div>
      }
    </nav>
  );
};

export default NavBar;
