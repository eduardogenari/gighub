import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { streamToBuffer } from "@/lib/utils";
import { generatePDF } from "@/lib/pdf";
import { getProductDetailsFromSession } from "@/lib/stripe";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  let session = body.session;

  // TODO: Send to user email
  const name = session.customer_details.name;
  const email = session.customer_details.email;
  const address = session.customer_details.address;

  try {
    let event = await getProductDetailsFromSession(session.id);
    const pdfStream = await generatePDF(event);
    const pdfBuffer = await streamToBuffer(pdfStream);

    const { data, error } = await resend.emails.send({
      from: "GigHub <hello@resend.dev>",
      to: ["emgenari@gmail.com"],
      subject: `Your order for: ${event.name}`,
      react: EmailTemplate({ event }),
      attachments: [
        {
          filename: "GigHubTicket.pdf",
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
