"use server";

import { getAllEvents, getEventById, getEventsByDates } from "@/lib/events";

export async function actionGetAllEvents() {
  const events = await getAllEvents();
  return events;
}

export async function actionGetEventById(eventId: string) {
  const event = await getEventById(eventId);
  return event;
}

export async function actionGetEventsByDate(start: string, end: string) {
  const events = await getEventsByDates(start, end);
  return events;
}
