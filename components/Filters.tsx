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

const FormSchema = z.object({
  artist: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  price: z.array(z.number()).length(2).optional(),
  hideWithoutPrice: z.string().optional(),
});

export default function Filters({
  artists,
  genres,
}: {
  artists: string[];
  genres: string[];
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
        />
        <SearchItem
          form={form}
          name={"genre"}
          label={"Genre"}
          placeholder={"Type a genre"}
          options={genres}
        />
        <CalendarItem
          form={form}
          name={"startDate"}
          label={"Start date"}
          placeholder={"Pick a start date"}
        />
        <CalendarItem
          form={form}
          name={"endDate"}
          label={"End date"}
          placeholder={"Pick an end date"}
        />
        <SliderItem form={form} name={"price"} label={"Price range"} />
        <CheckboxItem
          form={form}
          name={"hideWithoutPrice"}
          label={"Hide events without information on price"}
        />
        <Button type="submit">Apply</Button>
      </form>
    </Form>
  );
}
