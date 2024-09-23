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
import { getArtistsAndGenres, getLocations } from "@/actions/filter";
import { getBounds } from "@/lib/locations";

export default function SearchItem({
  form,
  name,
  label,
  placeholder,
  options,
  value,
  setArtistNames,
  setGenreNames,
  setLoading,
}: {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  setArtistNames: React.Dispatch<React.SetStateAction<string[]>>;
  setGenreNames: React.Dispatch<React.SetStateAction<string[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleClick = async (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    if (name === "location") {
      setLoading(true);
      let [locations, locationNames] = await getLocations();
      let bounds = getBounds(suggestion, locations, locationNames);
      const [artistNames, genreNames] = await getArtistsAndGenres(bounds);
      setArtistNames(artistNames);
      setGenreNames(genreNames);
      setLoading(false);
    }
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
                  className="px-3 cursor-pointer bg-background hover:bg-slate-200 text-sm p-2"
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
