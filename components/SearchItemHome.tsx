import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useState } from "react";
  import { Input } from "./ui/input";
  import { sortWithCommas } from "@/lib/utils";
  
  export default function SearchItemHome({
    form,
    name,
    label,
    options,
    value,
  }: {
    form: any;
    name: string;
    label: string;
    options: string[];
    value: string;
  }) {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [input, setInput] = useState<string>(value ? value : "");
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get input value
      const input = e.target.value;
      setInput(input);
  
      // Filter options and get first 5 suggestions
      let filteredOptions: string[] = options.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
  
     setSuggestions(sortWithCommas(filteredOptions).slice(0, 5));
  
      // Show options only if the input value is not an empty string
      if (input.length !== 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };
  
    const handleClick = (suggestion: string) => {
      setInput(suggestion);
      setShowSuggestions(false);
    };
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="search"
                value={input}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                className="mb-4 mt-0 px-0 py-0 border-none rounded-none w-[400px] h-[35px] shadow-none outline outline-0 focus:rounded-none focus:outline-0 focus:border-none focus-visible:ring-0 focus-visible:ring-transparent"
              />
            </FormControl>
            {showSuggestions && suggestions.length > 0 ? (
              <ul className="border rounded absolute z-10 w-[400px]">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={(e) => {
                      field.onChange(suggestion);
                      handleClick(suggestion);
                    }}
                    className="px-3 cursor-pointer bg-background hover:bg-slate-500 text-sm p-2"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : null}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  