#!/usr/bin/env npx ts-node

import { getAllEvents } from "@/lib/events";

const concerts = await getAllEvents();

console.log(concerts);
