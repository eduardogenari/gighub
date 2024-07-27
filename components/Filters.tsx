"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CalendarItem from "./CalendarItem";
import SearchItem from "./SearchItem";
import SliderItem from "./SliderItem";
import { useRouter } from "next/navigation";
import { format } from "url";
import { dateToYYYYMMDD } from "@/lib/utils";

const FormSchema = z.object({
  artist: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  price: z.array(z.number()).length(2).optional(),
});

export default function Filters({ artists }: { artists: string[] }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Add new keys if they are submitted
    let query: { [key: string]: string } = {};
    if (data.startDate) {
      query.startDate = dateToYYYYMMDD(data.startDate);
    }
    if (data.endDate) {
      query.endDate = dateToYYYYMMDD(data.endDate);
    }
    if (data.artist) {
      query.artist = data.artist;
    }
    if (data.price) {
      query.price = data.price.toString();
    }

    // Construct URL to pass variables to backend
    const url = format({
      pathname: "/map",
      query: query,
    });
    router.push(url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SearchItem
          form={form}
          name={"artist"}
          label={"Artist"}
          placeholder={"Type an artist name"}
          options={artists}
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
        <Button type="submit">Apply</Button>
      </form>
    </Form>
  );
}
