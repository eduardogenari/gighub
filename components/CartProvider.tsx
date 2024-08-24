"use client";

import React from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <USCProvider
      mode="checkout-session"
      stripe={"pk_test_51PrOhURw8nTTPadTaKj9SmFDHb0iEW3Kpe9P3tlR9AWvZqsI5p2C6y1EVvuKJlk57ybxwX3LXdzw6qtT6uyImHr200m4aUPBdt"}
      currency={"USD"}
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
