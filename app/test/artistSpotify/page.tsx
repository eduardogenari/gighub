"use client";

import React from "react";
import ArtistTopTracks from "@/components/ArtistTopTracks";
import { generatePDF, generateAndSavePDF } from "@/lib/pdf";
import { Button } from "@/components/ui/button"; // Importa el botón de ShadCN

export default function Page() {
  const handleGeneratePDF = async () => {
    const pdfStream = await generatePDF();
    console.log("PDF generado:", pdfStream);
    // Aquí podrías hacer algo con el PDF, como mostrarlo en un visor.
  };

  const handleSavePDF = async () => {
    await generateAndSavePDF();
    alert("PDF guardado como output.pdf");
  };

  return (
    <>
      <div>
        <ArtistTopTracks artistName="The Tyets" />
        <div className="flex gap-2 mt-4">
          <Button onClick={handleGeneratePDF}>Generar PDF</Button>
          <Button onClick={handleSavePDF}>Guardar PDF como archivo</Button>
        </div>
      </div>
    </>
  );
}
