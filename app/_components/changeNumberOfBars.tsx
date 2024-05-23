import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { getTImeoutId2, getTimeoutId1 } from '../sortingAlgos/mergeSort';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const ChangeBars = ({setNumOfBars}: any) => {
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

        let timeOut1 = getTimeoutId1();
        let timeOut2 = getTImeoutId2();
        
        if(timeOut1) {
            timeOut1.forEach(element => {
                clearTimeout(element);
            });

            timeOut1 = null;

            if(timeOut2) {
                timeOut2.forEach(element => {
                    clearTimeout(element);
                });
            }
            timeOut2 = null;
        }

        

        // Reset the entire array
        const num = parseInt(data.name, 10);
        if (Number.isNaN(num)) return;
        setNumOfBars(() => 0);
        setTimeout(() => setNumOfBars(() => num), 1);
      }
  return (
    <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex justify-center items-center gap-5 w-full"
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
  )
}

export default ChangeBars