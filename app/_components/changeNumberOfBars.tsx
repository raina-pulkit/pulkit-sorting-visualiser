import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChangeBars = ({
  setNum,
  timeoutID1,
  timeoutID2,
  setTimeoutID1,
  setTimeoutID2,
  setChangeByNum
}: {
  setNum: Dispatch<SetStateAction<number>>;
  timeoutID1: Array<NodeJS.Timeout> | null;
  timeoutID2: Array<NodeJS.Timeout> | null;
  setTimeoutID1: Dispatch<SetStateAction<Array<NodeJS.Timeout> | null>>;
  setTimeoutID2: Dispatch<SetStateAction<Array<NodeJS.Timeout> | null>>;
  setChangeByNum: Dispatch<SetStateAction<boolean>>
}) => {
  const FormSchema = z.object({
    name: z.string().min(1, {
      message: "There must be some value!",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Stop any existing timeouts

    if (timeoutID1) {
      timeoutID1.forEach((element) => {
        clearTimeout(element);
      });

      setTimeoutID1(null);

      if (timeoutID2) {
        timeoutID2.forEach((element) => {
          clearTimeout(element);
        });
      }
      setTimeoutID2(null);
    }

    // Reset the entire array
    const num = parseInt(data.name, 10);
    if (Number.isNaN(num)) return;

    setNum(() => num);
    setChangeByNum((prev) => !prev);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 flex justify-center items-center gap-5"
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
  );
};

export default ChangeBars;
