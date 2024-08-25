"use server";

import { stripe } from "@/lib/stripe";

export async function getPriceId(name: string) {
  const product = await stripe.products.search({
    query: `active:'true' AND name:'${name}'`,
  });

  const price = await stripe.prices.search({
    query: `active:'true' AND product:'${product.data[0].id}'`,
  });

  return price.data[0].id;
}
