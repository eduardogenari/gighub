"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import CalendarItem from "./CalendarItem";
import { useRouter } from "next/navigation";
import { format } from "url";
import { dateToYYYYMMDD } from "@/lib/utils";

const FormSchema = z.object({
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
});

export default function Filters() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = format({
      pathname: "/map",
      query: {
        startDate: dateToYYYYMMDD(data.startDate),
        endDate: dateToYYYYMMDD(data.endDate),
      },
    });
    router.push(url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit">Apply</Button>
      </form>
    </Form>
  );
}
