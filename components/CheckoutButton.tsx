import { MouseEvent, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";

export default function CheckoutButton() {
  const [status, setStatus] = useState("idle");
  const { redirectToCheckout, cartCount, totalPrice } = useShoppingCart();

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (cartCount) {
      if (cartCount > 0) {
        setStatus("loading");
        try {
          const result = await redirectToCheckout();
          if (result?.error) {
            console.error(result);
            setStatus("redirect-error");
          }
        } catch (error) {
          console.error(error);
          setStatus("redirect-error");
        }
      } else {
        setStatus("no-items");
      }
    }
  }

  return (
    <article className="mt-3 flex flex-col">
      <div className="text-red-700 text-xs mb-3 h-5 text-center">
        {totalPrice && totalPrice < 30
          ? "You must have at least £0.30 in your basket"
          : cartCount && cartCount > 20
          ? "You cannot have more than 20 items"
          : status === "redirect-error"
          ? "Unable to redirect to Stripe checkout page"
          : status === "no-items"
          ? "Please add some items to your cart"
          : null}
      </div>
      <Button
        onClick={handleClick}
        className="disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-white"
        disabled={
          (totalPrice && totalPrice < 30) ||
          (cartCount && cartCount > 20) ||
          status == "no-items"
            ? true
            : false
        }
      >
        {status !== "loading" ? "Proceed to checkout" : "Loading..."}
      </Button>
    </article>
  );
}
