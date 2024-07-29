"use client";

import { Slider } from "@/components/ui/slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";

export default function SliderItem({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const handleChange = (newValue: number[]) => {
    setMin(newValue[0]);
    setMax(newValue[1]);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            min={0}
            step={1}
            onValueChange={handleChange}
            className={cn("w-full pt-1")}
          />
          <div className="grid grid-cols-2 justify-between text-gray-500">
            <FormControl>
              <Input
                {...field}
                type="text"
                value={min}
                placeholder={"Min"}
                className="border-none focus-visible:ring-0 caret-transparent shadow-none p-0"
              />
            </FormControl>
            <FormControl>
              <Input
                {...field}
                type="text"
                value={max}
                placeholder={"Max"}
                className="border-none focus-visible:ring-0 caret-transparent text-right shadow-none p-0"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
