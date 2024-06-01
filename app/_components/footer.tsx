import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-[200px] bg-[#161616] flex text-white text-2xl justify-evenly items-center tracking-wider">
      <div className="flex flex-col text-center">
        <h1 className="text-4xl text-orange-600">Sorting Visualizer</h1>
        <span>Pulkit Raina</span>
        <span>Rachit Mehta</span>
        <span>Sannidhi M</span>
        <span>Nidhi MN</span>
      </div>
      <div className="flex flex-col text-center">
        <h1 className="text-4xl text-orange-600">USNs</h1>
        <span>1BM21CS148</span>
        <span>1BM21CS156</span>
        <span>1BM21CS189</span>
        <span>1BM21CS266</span>
      </div>
      <div className="h-5/6 flex flex-col text-center items-center justify-start gap-5">
        <h1 className="text-4xl text-orange-600">Links</h1>
        <Link
          href={"https://github.com/raina-pulkit/pulkit-sorting-visualiser"}
        >
          <Github size={50} className="hover:scale-95 transition-all duration-150"/>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
