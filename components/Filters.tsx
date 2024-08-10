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
  startDate,
  endDate,
  location,
  price,
  artist,
  genre,
  locationNames,
}: {
  artists: string[];
  genres: string[];
  startDate: Date;
  endDate: Date;
  location: string;
  price: number[];
  artist: string;
  genre: string;
  locationNames: string[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form action={filter} className="space-y-4">
        <SearchItem
          form={form}
          name={"artist"}
          label={"Artist"}
          placeholder={"Type an artist name"}
          options={artists}
          value={artist}
        />
        <SearchItem
          form={form}
          name={"genre"}
          label={"Genre"}
          placeholder={"Type a genre"}
          options={genres}
          value={genre}
        />
        <SearchItem
          form={form}
          name={"location"}
          label={"Location"}
          placeholder={"Search a location"}
          options={locationNames}
          value={location}
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
