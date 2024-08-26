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
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUCCESS_URL}/api/resend`, {
    method: "POST",
    body: JSON.stringify({
      id: data.id,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  return response;
}
