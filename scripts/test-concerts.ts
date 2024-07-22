#!/usr/bin/env npx ts-node

import { getAllConcerts } from "@/lib/concerts";


const concerts = await getAllConcerts();

console.log(concerts);