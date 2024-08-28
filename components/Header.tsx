"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import ShoppingCart from "@/components/ShoppingCart";
import { IoMdCart } from "react-icons/io";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";

export default function Header() {
  const { handleCartClick, cartCount } = useShoppingCart();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isEventDetailPage = /^\/events\/\d+$/.test(pathname);

  return (
    <header className="h-14 w-[65vw] mx-2 md:mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <Link href="/">
          <h3 className="hover:text-destructive">
            <strong>gighub</strong>
          </h3>
        </Link>
        <Link href="/events">
          <p className="hover:text-destructive">events</p>
        </Link>
        <ModeToggle />
      </div>
      <div className="flex items-center space-x-10">
        {isEventDetailPage && (
          <div>
            <Button
              className="flex gap-2 items-center m-0 p-0 hover:bg-transparent"
              variant={"ghost"}
              onClick={() => handleCartClick()}
            >
              <IoMdCart className="w-6 h-6 hover:text-destructive" />
              <div className="rounded-full bg-orange-500 text-xs text-white w-6 h-6 flex justify-center items-center">
                {cartCount}
              </div>
            </Button>
            <ShoppingCart />
          </div>
        )}
      </div>
    </header>
  );
}