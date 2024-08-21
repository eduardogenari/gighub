"use server";

import { format } from "url";
import { dateToYYYYMMDD } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const artist = formData.get("artist") as string;
  const genre = formData.get("genre") as string;
  const location = formData.get("location") as string;
  const price = formData.getAll("price");
  const hideWithoutPrice = formData.get("hideWithoutPrice") as string;

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
  if (genre) {
    query.genre = genre;
  }
  if (price) {
    query.price = price.toString();
  }
  if (location) {
    query.location = location;
  }
  if (hideWithoutPrice) {
    query.hideWithoutPrice = "on";
  } else {
    query.hideWithoutPrice = "off";
  }

  // Construct URL to pass variables to backend
  const url = format({
    pathname: "/map",
    query: query,
  });

  //console.log("Redirecting to...", url);
  redirect(url);
}
