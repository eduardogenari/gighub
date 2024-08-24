import { useShoppingCart } from "use-shopping-cart";
import { formatCurrencyString } from "use-shopping-cart";
import Image from "next/image";
import { CartEntry } from "use-shopping-cart/core";

export default function CartItem({ item }: { item: CartEntry }) {
  const { name, quantity, price } = item;
  const { removeItem } = useShoppingCart();

  const removeItemFromCart = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      <div>
        {name} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto">
        {formatCurrencyString({ value: price, currency: "GBP" })}
      </div>
      <button
        onClick={() => removeItemFromCart()}
        className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
      >
        <Image alt="delete icon" src="./trash.svg" width={20} height={20} />
      </button>
    </div>
  );
}
