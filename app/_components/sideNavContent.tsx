"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SortAsc } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { IoHome } from "react-icons/io5";
import { useGlobalContext } from "../utils/globalProvider";

const Heading = ({
  text,
  icon,
  styles,
}: {
  text: string;
  icon: boolean;
  styles?: string;
}): ReactNode => {
  const router = useRouter();

  return (
    <div className="text-white w-full pl-5">
      <Button
        className={`w-full flex justify-start gap-3 items-center text-4xl font-extrabold px-1.5 py-0 ${styles}`}
        variant={"ghost"}
        onClick={() => router.push("/")}
      >
        {icon ? <IoHome size={30}/> : <SortAsc size={30}/>}
        {text}
      </Button>
    </div>
  );
};

const SideHeading = ({ text }: { text: string }): ReactNode => {
  return (
	<h1 className="text-amber-200 text-center text-3xl mt-8">{text}</h1>
  );
};

const Sorts = ({ text, endpoint }: { text: string; endpoint: string }) => {
	const router = useRouter();
  const { setShow } = useGlobalContext();
  return (
	<Button onClick={() => {
    router.push(`/${endpoint}`);
    setShow(false);
  }} className="text-white text-2xl bg-transparent" variant={"ghost"} >{text}</Button>
  )
};

const SideNavContent = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-black opacity-90 py-20">
      <div className="flex flex-col gap-4">
        <Heading text="Home" icon={true} />
        <Separator />
        <Heading text="Sorts" icon={false} />
      </div>
      <div className="flex flex-col">
        <SideHeading text="LOGARITHMIC" />
        <Sorts text="Merge Sort" endpoint="merge-sort" />
        <Sorts text="Quick Sort" endpoint="quick-sort" />
        <Sorts text="Heap Sort" endpoint="heap-sort" />
      </div>
      <div className="flex flex-col">
        <SideHeading text="QUADRATIC" />
        <Sorts text="Heap Sort" endpoint="bubble-sort" />
        <Sorts text="Selection Sort" endpoint="selection-sort" />
        <Sorts text="Insertion Sort" endpoint="insertion-sort" />
      </div>
      <div className="flex flex-col">
        <SideHeading text="WEIRD" />
        <Sorts text="Bitonic Sort" endpoint="bitonic-sort" />
        <Sorts text="Radix Sort" endpoint="radix-sort" />
      </div>
    </div>
  );
};

export default SideNavContent;
