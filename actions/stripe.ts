"use server";

import { stripe } from "@/lib/stripe";
import type { Stripe } from "stripe";

export async function getPriceId(name: string) {
  const product = await stripe.products.search({
    query: `active:'true' AND name:'${name}'`,
  });

  const price = await stripe.prices.search({
    query: `active:'true' AND product:'${product.data[0].id}'`,
  });

  return price.data[0].id;
}

export async function sendEmail(data: Stripe.Checkout.Session) {
  console.log("Data", data);
  const session = await stripe.checkout.sessions.retrieve(data.id);
  const products = await stripe.checkout.sessions.listLineItems(data.id);

  console.log(`Sending email to ${session.customer_details?.email}...`);
  const response = await fetch(`${process.env.RESEND_URL}/api/resend`, {
    method: "POST",
    body: JSON.stringify({
      products,
      session,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  return response;
}
