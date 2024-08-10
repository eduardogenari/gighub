import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "./ui/input";

export default function SearchItem({
  form,
  name,
  label,
  placeholder,
  options,
  setInput,
  input,  
  country,
  citiesByCountry,
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  country?: string;
  citiesByCountry?: Record<string, string[]>
}) {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get input value
    const input = e.target.value;
    setInput(input);

    // For city field, if country is defined, show only cities in that country
    if (name === "city" && country !== undefined && citiesByCountry !== undefined) {
      options = citiesByCountry[country];
    }

    // Filter options and get first 5 suggestions
    let filteredOptions: string[] = options.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filteredOptions.slice(0, 5));

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
              type="text"
              value={input}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              className="border border-gray-200 rounded"
            />
          </FormControl>
          {showSuggestions ? (
            <ul className="border border-gray-200 rounded absolute z-10 w-[21.2rem]">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    field.onChange(suggestion);
                    handleClick(suggestion);
                  }}
                  className="px-3 cursor-pointer bg-white hover:bg-orange-100 text-sm p-2"
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
