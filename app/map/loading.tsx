import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <Spinner />
      </div>
    </main>
  );
}
