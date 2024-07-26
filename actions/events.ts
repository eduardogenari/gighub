"use server";

import { getAllEvents, getEventById } from "@/lib/events";

export async function actionGetAllEvents() {
  const events = await getAllEvents();
  return events;
}

export async function actionGetEventById(eventId: string) {
  const event = await getEventById(eventId);
  return event;
}
