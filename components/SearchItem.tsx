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

export default function SearchItem({
  form,
  name,
  label,
  placeholder,
  options,
  value,
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
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
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              className="border rounded w-[250px]"
            />
          </FormControl>
          {showSuggestions && suggestions.length > 0 ? (
            <ul className="border rounded absolute z-10 w-[250px]">
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
