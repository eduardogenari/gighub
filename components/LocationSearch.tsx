"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SearchItem from "@/components/SearchItem";
import { searchLocation } from "@/actions/search";
import { Button } from "./ui/button";

const FormSchema = z.object({
  location: z.string(),
});

export default function LocationSearch({ locations }: { locations: string[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form
        action={searchLocation}
        className="flex justify-center items-end gap-2"
      >
        <SearchItem
          form={form}
          name={"location"}
          label={"Location"}
          placeholder={"Type a location"}
          options={locations}
          value={"Barcelona, Spain"}
        />
        <Button type="submit" className="">
          Search
        </Button>
      </form>
    </Form>
  );
}
