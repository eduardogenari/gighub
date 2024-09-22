"use server";

import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
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
  const session = await stripe.checkout.sessions.retrieve(data.id);
  const products = await stripe.checkout.sessions.listLineItems(data.id);

  const response = await fetch(`${env("RESEND_URL")}/api/resend`, {
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
