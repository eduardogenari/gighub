import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "use-shopping-cart/core";
import { CiCircleMinus } from "react-icons/ci";

export default function CartItem({ item }: { item: CartEntry }) {
  const { name, quantity, price, currency } = item;
  const { removeItem } = useShoppingCart();

  const removeItemFromCart = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      <div>
        {name} <span className="text-xs text-orange-700">({quantity})</span>
      </div>
      <div className="ml-auto">
        {price} {currency}
      </div>
      <CiCircleMinus onClick={() => removeItemFromCart()} className="w-5 h-5" />
    </div>
  );
}
