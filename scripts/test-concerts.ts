#!/usr/bin/env npx ts-node

import { getAllEvents } from "@/lib/concerts";


const concerts = await getAllEvents();

console.log(concerts);