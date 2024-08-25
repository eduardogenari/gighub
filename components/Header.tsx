"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { RiSearchLine } from "react-icons/ri";
import ShoppingCart from "@/components/ShoppingCart";
import { IoMdCart } from "react-icons/io";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";

export default function Header() {
  const { handleCartClick, cartCount } = useShoppingCart();
  return (
    <header className="h-14 w-[65vw] mx-2 md:mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-20">
        <Link href="/">
          <h3>
            <strong>gighub</strong>
          </h3>
        </Link>
        <Link href="/events">
          <RiSearchLine className="w-6 h-6" />
        </Link>
      </div>
      <div className="flex items-center space-x-20">
        <div>
          <Button
            className="flex gap-2 items-center m-0 p-0"
            variant={"ghost"}
            onClick={() => handleCartClick()}
          >
            <IoMdCart className="w-6 h-6" />
            <div className="rounded-full bg-orange-500 text-xs text-white w-6 h-6 flex justify-center items-center">
              {cartCount}
            </div>
          </Button>
          <ShoppingCart />
        </div>
        <ModeToggle />
        <Link href="/login">
          <Avatar className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
