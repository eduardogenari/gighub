import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function LoginPage() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p>login page</p>
      </div>
      <Footer />
    </main>
  );
}
