"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event";
import { useState } from "react";
import { dateToYYYYMMDD } from "@/lib/utils";
import { getPriceId } from "@/actions/stripe";

type PaymentButtonsProps = {
  event: Event;
};

export default function PaymentButtons({ event }: PaymentButtonsProps) {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const standardPrice = event.priceRange
    .filter((priceRange) => priceRange.type == "standard")
    .map((priceRange) => priceRange)[0];
  const price = standardPrice.min ? standardPrice.min : 0;
  const currency = standardPrice.currency;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const location =
    event.venue[0].name !== null
      ? `${event.venue[0].name} (${event.venue[0].city}, ${event.venue[0].country})`
      : `${event.venue[0].city}, ${event.venue[0].country}`;

  const name = `${dateToYYYYMMDD(event.startDate)} - ${
    event.name
  } - ${location}`;

  const addToCart = (priceId: string) => {
    addItem(
      {
        name,
        description: event.name,
        id: priceId,
        price: price,
        currency: currency,
        image: event.image[0].url,
      },
      { count: quantity }
    );
    setQuantity(1);
  };

  return (
    <div className="flex justify-around flex-col items-center md:mt-20 mb-10 gap-2">
      <div>
        <button
          onClick={decreaseQuantity}
          className="hover:text-white hover:bg-[hsl(var(--destructive))] w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="hover:text-white hover:bg-[hsl(var(--destructive))] w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <Button
        className="w-[200px] hover:bg-destructive"
        onClick={async () => {
          const priceId = await getPriceId(name);
          addToCart(priceId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
