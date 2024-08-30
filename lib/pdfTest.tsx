"use server";

import ReactPDF, { renderToStream } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import { writeFile } from "fs/promises";
import { Event } from "@/types/event";
import PdfDocumentTest from "@/components/PdfDocumentTest";

export const generatePDFTest = async (event: Event) => {
    const pdfStream = await renderToStream(<PdfDocumentTest event={event} />);
    return pdfStream;
};

export const generateAndSavePDFTest = async (event: Event) =>  {
  const pdfStream = await renderToStream(<PdfDocumentTest event={event} />);
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
