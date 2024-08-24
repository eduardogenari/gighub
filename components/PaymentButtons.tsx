"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event";
import { useState } from "react";

type PaymentButtonsProps = {
  event: Event;
};

export default function PaymentButtons({ event }: PaymentButtonsProps) {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    addItem(
      {
        name: event.name,
        description: event.name,
        id: event.id.toString(),
        price:
          event.priceRange[0]["min"] !== null ? event.priceRange[0]["min"] : 0,
        currency:
          event.priceRange[0]["currency"] !== null
            ? event.priceRange[0]["currency"]
            : "Unknown",
        image: event.image[0].url,
      },
      { count: quantity }
    );
    setQuantity(1);
  };

  return (
    <div className="flex justify-around items-center mt-20 mb-10">
      <button
        onClick={decreaseQuantity}
        className="hover:text-white hover:bg-orange-500 w-8 h-8 rounded-full transition-colors duration-500"
      >
        -
      </button>
      <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className="hover:text-white hover:bg-orange-500 w-8 h-8 rounded-full transition-colors duration-500"
      >
        +
      </button>
      <Button className="w-[200px]" onClick={() => addToCart()}>
        Buy Ticket
      </Button>
    </div>
  );
}
