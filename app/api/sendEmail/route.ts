import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { streamToBuffer } from '@/lib/utils';
import { EmailTemplateTest } from '@/components/EmailTemplateTest';
import { generatePDFTest } from '@/lib/pdfTest';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { event } = await req.json();

  if (!event) {
    return NextResponse.json({ error: 'Event data is required' }, { status: 400 });
  }

  const pdfStream = await generatePDFTest(event);
  const pdfBuffer = await streamToBuffer(pdfStream);

  const { data, error } = await resend.emails.send({
    from: 'GigHub <hello@resend.dev>',
    to: ['emgenari@gmail.com'],
    subject: `Your order for: ${event.name}`,
    react: EmailTemplateTest({ event }),
    attachments: [
      {
        filename: 'GigHubTicket.pdf',
        content: pdfBuffer,
      },
    ],
  });

  if (error) {

    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  console.log(data)

  return NextResponse.json(data, { status: 200 });
}
