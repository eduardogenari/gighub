"use server";

import { renderToStream } from "@react-pdf/renderer";

import { writeFile } from "fs/promises";
import { Event } from "@/types/event";
import PdfDocument from "@/components/PdfDocument";

export const generatePDF = async (event: Event) => {
  const pdfStream = await renderToStream(<PdfDocument event={event} />);
  return pdfStream;
};

export const generateAndSavePDF = async (event: Event) => {
  const pdfStream = await renderToStream(<PdfDocument event={event} />);
  const chunks: Uint8Array[] = [];
  pdfStream.on("data", (chunk) => {
    chunks.push(chunk);
  });
  pdfStream.on("end", async () => {
    const pdfBuffer = Buffer.concat(chunks);
    await writeFile("output.pdf", pdfBuffer);
    console.log("PDF creado y guardado como output.pdf");
  });
};
