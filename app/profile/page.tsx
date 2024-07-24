import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function ProfilePage() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p>profile page</p>
      </div>
      <Footer />
    </main>
  );
}
