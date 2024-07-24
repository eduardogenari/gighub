import Cover from "@/components/Cover";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <Cover />
      <Footer />
    </main>
  );
}
