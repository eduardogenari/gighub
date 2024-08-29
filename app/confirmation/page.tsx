"use server";

import { stripe } from "@/lib/stripe";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
  // Get session ID
  let { session_id } = searchParams ?? {};
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const products = await stripe.checkout.sessions.listLineItems(session_id);

  {
    // TODO: Style this
    return (
      <div className="w-[65vw] mx-2 md:mx-auto my-10 flex-1">
        <h1 className="text-2xl font-medium">Confirmation</h1>
        <h2 className="text-xl font-medium text-destructive">Payment status</h2>
        <p>
          {session.payment_status.charAt(0).toUpperCase() +
            session.payment_status.slice(1)}
        </p>
        <h2 className="text-xl font-medium text-destructive">
          Customer details
        </h2>
        <p>{session.customer_details?.name}</p>
        <p>{session.customer_details?.email}</p>
        <p>
          {session.customer_details?.address?.line1},{" "}
          {session.customer_details?.address?.line2},{" "}
          {session.customer_details?.address?.postal_code}
          {session.customer_details?.address?.city},{" "}
          {session.customer_details?.address?.state},{" "}
          {session.customer_details?.address?.country}
        </p>
        <h2 className="text-xl font-medium text-destructive">Products</h2>
        {products.data.map((product, index) => (
          <div key={index}>
            <p>{product.id}</p>
            <p>{product.description}</p>
            <p>
              {product.quantity} x {product.amount_total / 100}{" "}
              {product.currency}
            </p>
          </div>
        ))}
        <h2 className="text-xl font-medium text-destructive">Total amount</h2>
        <p>
          {session.amount_total ? session.amount_total / 100 : "Unknown"}{" "}
          {session.currency}
        </p>
      </div>
    );
  }
}
