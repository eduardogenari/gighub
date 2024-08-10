"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CalendarItem from "./CalendarItem";
import SearchItem from "./SearchItem";
import SliderItem from "./SliderItem";
import CheckboxItem from "./CheckboxItem";
import { filter } from "@/actions/filter";
import { useState } from "react";

const FormSchema = z.object({
  artist: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  genre: z.string().optional(),
  price: z.array(z.number()).length(2).optional(),
});

export default function Filters({
  artists,
  genres,
  countries,
  cities,
  startDate,
  endDate,
  country,
  city,
  price,
  artist,
  genre,
  citiesByCountry
}: {
  artists: string[];
  genres: string[];
  countries: string[];
  cities: string[];
  startDate: Date;
  endDate: Date;
  country: string;
  city: string;
  price: number[];
  artist: string;
  genre: string;
  citiesByCountry: Record<string, string[]>
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [inputArtist, setInputArtist] = useState<string>(artist ? artist : "");
  const [inputCountry, setInputCountry] = useState<string>(country ? country : "");
  const [inputCity, setInputCity] = useState<string>(city ? city : "");
  const [inputGenre, setInputGenre] = useState<string>(genre ? genre : "");

  return (
    <Form {...form}>
      <form action={filter} className="space-y-4">
        <SearchItem
          form={form}
          name={"artist"}
          label={"Artist"}
          placeholder={"Type an artist name"}
          options={artists}
          setInput={setInputArtist}
          input={inputArtist}
        />
        <SearchItem
          form={form}
          name={"genre"}
          label={"Genre"}
          placeholder={"Type a genre"}
          options={genres}
          setInput={setInputGenre}
          input={inputGenre}
        />
        <SearchItem
          form={form}
          name={"country"}
          label={"Country"}
          placeholder={"Search a country"}
          options={countries}
          setInput={setInputCountry}
          input={inputCountry}
        />
        <SearchItem
          form={form}
          name={"city"}
          label={"City"}
          placeholder={"Search a city"}
          options={cities}
          setInput={setInputCity}
          input={inputCity}
          country={inputCountry}
          citiesByCountry={citiesByCountry}
        />
        <CalendarItem
          form={form}
          name={"startDate"}
          label={"Start date"}
          placeholder={"Pick a start date"}
          value={startDate}
        />
        <CalendarItem
          form={form}
          name={"endDate"}
          label={"End date"}
          placeholder={"Pick an end date"}
          value={endDate}
        />
        <SliderItem
          form={form}
          name={"price"}
          label={"Price range"}
          value={price}
        />
        <Button type="submit">Apply</Button>
      </form>
    </Form>
  );
}
