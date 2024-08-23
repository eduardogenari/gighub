"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

export default function CheckboxItem({
  form,
  name,
  label,
  value,
}: {
  form: any;
  name: string;
  label: string;
  value: string;
}) {
  const [checked, setChecked] = useState<boolean>(
    value === "on" ? true : false
  );
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-[250px]">
          <FormControl>
            <Checkbox
              {...field}
              id={name}
              className="mr-2"
              checked={checked}
              onClick={() => setChecked(!checked)}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
