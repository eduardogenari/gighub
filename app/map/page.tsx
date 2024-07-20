import dynamic from 'next/dynamic';
import { promises as fs } from "fs";
import React, { useMemo } from 'react'
import Filters from "@/components/filters";
import Spinner from '@/components/Spinner';
import { NavigationMenu } from "@/components/ui/navigation-menu";

export default async function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <div className="flex justify-center items-center h-screen"><Spinner/></div>,
        ssr: false,
      }),
    []
  );
  const eventsFile = await fs.readFile(process.cwd() + "/app/map/events.json", "utf8");
  const markers = JSON.parse(eventsFile);

  return (
    <main className="h-screen w-screen flex overflow-hidden bg-gray-200">
      <div className="w-1/5 bg-white p-4">
        <h1 className="text-lg font-bold mb-4">Filters</h1>
        <NavigationMenu></NavigationMenu>
        <Filters />
      </div>
      <div className="w-4/5 bg-gray-100">
        <Map markers={markers} />
      </div>
    </main>
  );
}
