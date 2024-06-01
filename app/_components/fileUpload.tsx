"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useGlobalContext } from "../utils/globalProvider";

const arrFormer = (text: string) => {
	console.log("text: ", text);
	
  const temp = text.split(" ");
  const arr = temp.map((item) => {
	if(!isNaN(Number(item))) return parseInt(item, 10);
	else throw new Error("Not a valid array!")
  });

  return arr;
};

const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const { toast } = useToast();
  const { setArr, arr, setNum } = useGlobalContext();

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
          const newArr = arrFormer(txt);
          setArr(() => newArr);
		  setNum(() => newArr.length);
		  console.log(arr);
		  
        } catch (e: any) {
			toast({ title: "Error", description: e.message, variant: "destructive" });
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
      <Input
        id="array"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default FileUpload;
