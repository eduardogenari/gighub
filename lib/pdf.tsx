import ReactPDF, { renderToStream } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";

export const generatePDF = async () => {
  const pdfStream = await ReactPDF.renderToStream(<PdfDocument/>);
  //const pdfStream = "";
  return pdfStream
};
