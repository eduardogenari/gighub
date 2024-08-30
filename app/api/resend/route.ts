import { EmailTemplate } from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { streamToBuffer } from "@/lib/utils";
import { generatePDF } from "@/lib/pdf";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  let products = body.products;
  let session = body.session;

  // TODO: Send to user email
  const name = session.customer_details.name;
  const email = session.customer_details.email;
  const address = session.customer_details.address;

  try {


    const pdfStream = await generatePDF();
    const pdfBuffer = await streamToBuffer(pdfStream);

    const { data, error } = await resend.emails.send({
      from: "Alba <hello@resend.dev>",
      to: ["laia.valenti@gmail.com"],
      subject: "Receipt from Stripe",
      react: EmailTemplate({ name, products }),
      attachments:  [
        {
          filename: 'document.pdf',
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
