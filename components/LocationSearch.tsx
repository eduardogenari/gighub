"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SearchItem from "@/components/SearchItem";
import { searchLocation } from "@/actions/search";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import SearchItemHome from "./SearchItemHome";

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
        className="w-[455px] h-[55px] flex flex-row justify-center items-center bg-background p-[10px]"
      >
        <SearchItemHome
          form={form}
          name={"location"}
          label={""}
          options={locations}
          value={"Barcelona, Spain"}
        />
        <Button
          type="submit"
          className="h-[35px] w-[35px] rounded-none mt-2 mb-2 border-[1px] border-primary"
        >
          <FaArrowRight className="h-4 w-4 shrink-0" />
        </Button>
      </form>
    </Form>
  );
}
