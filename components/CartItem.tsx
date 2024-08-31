import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "use-shopping-cart/core";
import { CiCircleMinus } from "react-icons/ci";
import Image from "next/image";

export default function CartItem({ item }: { item: CartEntry }) {
  const { name, quantity, price, currency, image } = item;
  const { removeItem } = useShoppingCart();

  const removeItemFromCart = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      {image ? (
        <div className="h-20 w-20 flex flex-col">
          <div className="relative h-full w-full">
            <Image
              fill
              style={{ objectFit: "cover" }}
              alt={name}
              src={image}
              className="rounded-[12px]"
            />
          </div>
        </div>
      ) : null}
      <div className="w-52">
        <span className="text-[hsl(var(--destructive))]">{quantity} x</span> {name}
      </div>
      <div className="ml-auto">
        {price} {currency}
      </div>
      <CiCircleMinus onClick={() => removeItemFromCart()} className="w-5 h-5" />
    </div>
  );
}
