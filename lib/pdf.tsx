import ReactPDF, { renderToStream } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import fs from "fs";

export const generatePDF = async () => {
  const pdfStream = await ReactPDF.renderToStream(<PdfDocument />);
  return pdfStream;
};


export const generateAndSavePDF = async () => {
  const pdfStream = await ReactPDF.renderToStream(<PdfDocument />);
  const chunks: Uint8Array[] = [];
  pdfStream.on("data", (chunk) => {
    chunks.push(chunk);
  });
  pdfStream.on("end", () => {
    const pdfBuffer = Buffer.concat(chunks);
    fs.writeFileSync("output.pdf", pdfBuffer);
    console.log("PDF creado y guardado como output.pdf");
  });
};