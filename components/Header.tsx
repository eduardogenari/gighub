import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-96">
      <Link href="/">
        <p>logo</p>
      </Link>
      <Link href="/map">
        <p>map</p>
      </Link>
      <Link href="/events">
        <p>events</p>
      </Link>
      <Link href="/login">
        <p>login</p>
      </Link>

      <Link href="/profile">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
