"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CalendarItem from "./CalendarItem";
import SearchItem from "./SearchItem";
import SliderItem from "./SliderItem";
import { search } from "@/actions/search";
import CheckboxItem from "./CheckboxItem";
import { useState } from "react";
import Spinner from "./Spinner";

const FormSchema = z.object({
  artist: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  genre: z.string().optional(),
  price: z.array(z.number()).length(2).optional(),
  location: z.string().optional(),
  hideWithoutPrice: z.string().optional(),
});

export default function Filters({
  artists,
  genres,
  locationNames,
  startDate,
  endDate,
  price,
  artist,
  genre,
  location,
  hideWithoutPrice,
  setArtistNames,
  setGenreNames,
}: {
  artists: string[];
  genres: string[];
  locationNames: string[];
  startDate: Date;
  endDate: Date;
  price: number[];
  artist: string;
  genre: string;
  location: string;
  hideWithoutPrice: string;
  setArtistNames: React.Dispatch<React.SetStateAction<string[]>>;
  setGenreNames: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form action={search} className="space-y-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-semibold">Filters</p>
          {loading ? <Spinner className="h-4 w-4" /> : null}
        </div>
        <SearchItem
          form={form}
          name={"location"}
          label={"Location"}
          placeholder={"Type a location"}
          options={locationNames}
          value={location}
          setArtistNames={setArtistNames}
          setGenreNames={setGenreNames}
          setLoading={setLoading}
        />
        <SearchItem
          form={form}
          name={"artist"}
          label={"Artist"}
          placeholder={"Type an artist name"}
          options={artists}
          value={artist}
          setArtistNames={setArtistNames}
          setGenreNames={setGenreNames}
          setLoading={setLoading}
        />
        <SearchItem
          form={form}
          name={"genre"}
          label={"Genre"}
          placeholder={"Type a genre"}
          options={genres}
          value={genre}
          setArtistNames={setArtistNames}
          setGenreNames={setGenreNames}
          setLoading={setLoading}
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
        <CheckboxItem
          form={form}
          name={"hideWithoutPrice"}
          label={"Hide events without information on price"}
          value={hideWithoutPrice}
        />
        <Button type="submit" className="w-[250px]">
          Apply
        </Button>
      </form>
    </Form>
  );
}
