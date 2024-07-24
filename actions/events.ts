"use server";

import { getAllEvents } from "@/lib/events";

export async function actionGetAllEvents() {
  const events = await getAllEvents();
  return events;
}
