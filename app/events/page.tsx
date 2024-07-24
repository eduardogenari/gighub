import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function EventsPage() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p>events page - filters/list/cards</p>
      </div>
      <Footer />
    </main>
  );
}
