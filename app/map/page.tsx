import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import Filters from "@/components/filters";
import { NavigationMenu } from "@/components/ui/navigation-menu";

export default function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>"Loading"</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main className="h-screen w-screen flex overflow-hidden bg-gray-200">

      <div className="w-1/5 bg-white p-4">
        <h1 className="text-lg font-bold mb-4">Filters</h1>
        <NavigationMenu></NavigationMenu>
        <Filters />
      </div>

      <div className="w-4/5 bg-gray-100">
        <Map />
      </div>

    </main>
  );
}
