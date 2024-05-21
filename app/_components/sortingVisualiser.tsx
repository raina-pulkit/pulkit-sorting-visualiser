"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "There must be some value!",
  }),
});

const SortingVisualiser = () => {
  const [arr, setArr] = useState(new Array(0));

  const randGenerator = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (num: number) => {
    var arrNew = new Array(num);
    for (var i = 0; i < num; i++) arrNew[i] = randGenerator(10, 100);
    setArr(arrNew);
  };

  useEffect(() => {
    resetArray(5);
  }, []);

  const heightCalc = (num: number, min: number, max: number) =>
    10 + ((num - min) * ((3 * window.innerHeight) / 4 - 10)) / (max - min);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const num = parseInt(data.name, 10);
    console.log(num);
    if (Number.isNaN(num)) return;

    resetArray(num);
  }

  return (
    <div className="flex flex-col flex-1 gap-3 h-full justify-end">
      <div className="flex justify-evenly items-end">
        {arr.map((_, ind) => {
          const n = arr.length;
          const gap = n > 100 ? 0 : 5;
          const currWidth = Math.max(
            2,
            Math.min(window.innerWidth / arr.length, 200)
          );
          console.log("currWidth: ", currWidth);

          return (
            <div
              key={ind}
              className={`bg-black`}
              style={{
                height: `${heightCalc(_, 10, 100)}px`,
                width: `${currWidth}px`,
              }}
            ></div>
          );
        })}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex justify-center items-center gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter number of array items!"
                    {...field}
                    className="border-2 border-black outline-none shadow-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="!m-0 w-1/6 min-w-min">
            Generate New Array
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SortingVisualiser;
