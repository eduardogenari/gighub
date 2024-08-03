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
import { ChangeEvent, useState } from "react";
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
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(1000);
  const handleChange = (range: number[]) => {
    setMin(range[0]);
    setMax(range[1]);
  };
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMin(parseFloat(event.target.value));
  };
  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMax(parseFloat(event.target.value));
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
            value={[min, max]}
            onValueChange={handleChange}
            className={cn("w-full pt-1")}
          />
          <div className="grid grid-cols-2 justify-between text-gray-500 gap-2">
            <FormControl>
              <Input
                {...field}
                type="number"
                value={min}
                onChange={handleMinChange}
                placeholder={"Min"}
                className="text-right focus-visible:ring-0 shadow-none p-0"
              />
            </FormControl>
            <FormControl>
              <Input
                {...field}
                type="number"
                value={max}
                onChange={handleMaxChange}
                placeholder={"Max"}
                className="text-right focus-visible:ring-0 text-right shadow-none p-0"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
