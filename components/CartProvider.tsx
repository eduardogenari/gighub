"use client";

import React from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: React.ReactNode }) {
  let countries = process.env.NEXT_PUBLIC_EUROPE_COUNTRIES;
  let countryList = [""]
  if (countries) {
    countryList = countries.split(",")
  }
  return (
    <USCProvider
      mode="payment"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      currency={"EUR"}
      allowedCountries={countryList}
      billingAddressCollection={true}
      successUrl={"http://localhost:3000?session_id={CHECKOUT_SESSION_ID}"}
      cancelUrl={"http://localhost:3000"}
      shouldPersist={false}
      cartMode="client-only"
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
