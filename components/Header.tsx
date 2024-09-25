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
    <header className="h-14 md:w-[65vw] w-screen px-2 md:mx-auto flex items-center justify-between">
      <Link href="/">
        <h3 className="hover:text-destructive">
          <strong>gighub</strong>
        </h3>
      </Link>
      <div className="flex justify-end gap-6 md:gap-10 items-center">
        <Link href="/events">
          <p className="hover:text-destructive">events</p>
        </Link>
        <ModeToggle />
        {isEventDetailPage && (
          <div>
            <Button
              className="flex gap-2 items-center m-0 p-0 hover:bg-transparent"
              variant={"ghost"}
              onClick={() => handleCartClick()}
            >
              <IoMdCart className="w-6 h-6 hover:text-destructive" />
              <div className="rounded-full bg-[hsl(var(--destructive))] text-xs text-white w-6 h-6 flex justify-center items-center">
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
