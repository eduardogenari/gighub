import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function CalendarItem({
  form,
  name,
  label,
  placeholder,
  value,
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  value: Date;
}) {
  const [input, setInput] = useState<Date>(value);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-[250px]">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("text-left font-normal")}
                >
                  {input ? format(input, "PPP") : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={input}
                onSelect={(e) => {
                  if (e) {
                    field.onChange(e);
                    setInput(e);
                  }
                }}
                defaultMonth={input}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
          <Input type="hidden" name={field.name} value={field.value} />
        </FormItem>
      )}
    />
  );
}
