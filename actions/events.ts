"use server"

import { getAllEvents } from "@/lib/concerts"



export async function actionGetAllEvents() {
    const events = await getAllEvents();
    return events;
}