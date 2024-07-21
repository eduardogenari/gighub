import Filters from "@/components/Filters";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen flex overflow-hidden bg-gray-200">


      <div className="w-1/5 bg-white p-4">
        <h1 className="text-lg font-bold mb-4">Filters</h1>
        <NavigationMenu></NavigationMenu>
        <Filters />
      </div>

      <div className="w-4/5 bg-gray-100 p-4">
        <h1 className="text-lg font-bold mb-4">Map</h1>
      </div>

    </main>
  );
}