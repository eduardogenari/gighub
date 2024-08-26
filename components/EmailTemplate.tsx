import * as React from "react";
import type { Stripe } from "stripe";
interface EmailTemplateProps {
  name: string;
  products: Stripe.Response<Stripe.ApiList<Stripe.LineItem>>;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  products,
}) => (
  <div>
    <h1>Hi {name}!</h1>
    <h2>Products</h2>
    {products.data.map((product, index) => (
      <div key={index}>
        <p>{product.id}</p>
        <p>{product.description}</p>
        <p>{product.quantity} x {product.amount_total/100} {product.currency}</p>
      </div>
    ))}
  </div>
);
