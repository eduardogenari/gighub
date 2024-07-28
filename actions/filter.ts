"use server";

import { format } from "url";
import { dateToYYYYMMDD } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function filter(formData: FormData) {
  
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const artist = formData.get("artist") as string;
  const price = formData.getAll("price");
  
  // Add new keys if they are submitted
  let query: { [key: string]: string } = {};
  if (startDate) {
    query.startDate = dateToYYYYMMDD(new Date(startDate));
  }
  if (endDate) {
    query.endDate = dateToYYYYMMDD(new Date(endDate));
  }
  if (artist) {
    query.artist = artist;
  }
  if (price) {
    query.price = price.toString();
  }

  // Construct URL to pass variables to backend
  const url = format({
    pathname: "/map",
    query: query,
  });

  console.log('Redirecting to...', url)
  redirect(url);
}
