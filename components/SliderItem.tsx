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

export default function SliderItem({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Slider
              defaultValue={[20, 50]}
              max={300}
              min={0}
              step={1}
              onValueChange={field.onChange}
              className={cn("w-full pt-1")}
            />
          </FormControl>
          <div className="grid grid-cols-2 justify-between text-gray-500">
            <p>{field.value ? field.value[0] : 20}</p>
            <p className="text-right">{field.value ? field.value[1] : 50}</p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
