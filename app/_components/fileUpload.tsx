"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/globalProvider";
import { stopAnimations } from "../utils/helperFuncs";

const arrFormer = (text: string): number[] => {
  const temp = text.split(" ");
  if (temp.length > 1e4) throw new Error("Size of input too large!");

  const arr = temp.map((item) => {
    if (!isNaN(Number(item))) return parseInt(item, 10);
    else throw new Error("Not a valid array!");
  });

  return arr;
};

const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const { toast } = useToast();
  const {
    setArr,
    arr,
    setNum,
    setChangeByArr,
    timeoutID1,
    timeoutID2,
    setTimeoutID1,
    setTimeoutID2,
  } = useGlobalContext();

  useEffect(() => {
    // console.log("Array changed to: ", arr);
  }, [arr]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set("file", file as Blob);

    if (!file) return;

    try {
      const res = await fetch("http://localhost:3000/api/upload-file", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      if (res.status === 200) {
        const txt = resData.success;
        toast({ title: "Success" });

        try {
          console.log("txt: ", txt);

          const newArr = arrFormer(txt);
          stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);
          // console.log("setting to: ", newArr);

          setNum(() => newArr.length);
          setArr(() => newArr);

          // console.log("setting to: ", newArr.length);

          setChangeByArr((prev) => !prev);
        } catch (e: any) {
          toast({
            title: "Error",
            description: e.message + "LMAO",
            variant: "destructive",
          });
        }
      } else throw new Error(resData.msg);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-3 flex-1">
      <label className="relative w-50 h-12 rounded-full bg-black shadow-custom-shadow flex items-center justify-center text-white font-bold cursor-pointer transform transition-transform duration-200 ease-out">
        Choose File
        <Input
          id="array"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="bg-black text-white"
        />
      </label>
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default FileUpload;
