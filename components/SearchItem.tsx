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
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
}) {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get input value
    const input = e.target.value;
    setInput(input);

    // Filter options
    const filteredOptions: string[] = options.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredOptions);

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
              className="py-1 px-2 border-1 border-gray-800 rounded"
            />
          </FormControl>
          {showSuggestions ? (
            <ul className="border border-gray-200 rounded">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    field.onChange(suggestion);
                    handleClick(suggestion);
                  }}
                  className="cursor-pointer hover:bg-orange-100 text-sm p-2"
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
