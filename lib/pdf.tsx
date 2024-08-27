"use server";

import ReactPDF, { renderToStream } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import { writeFile } from "fs/promises";

export const generatePDF = async () => {
  const pdfStream = await renderToStream(<PdfDocument />);
  return pdfStream;
};

export const generateAndSavePDF = async () => {
  const pdfStream = await renderToStream(<PdfDocument />);
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
