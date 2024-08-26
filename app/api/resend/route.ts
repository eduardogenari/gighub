import { EmailTemplate } from "@/components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  let id;
  if (body !== null) {
    id = body.id;
  } else {
    id = "None";
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Alba <hello@resend.dev>",
      to: ["alba.vilanova@outlook.com"],
      subject: "Receipt from Stripe",
      react: EmailTemplate({ firstName: "Alba", id }),
      attachments: [], // TODO: Add PDF
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
