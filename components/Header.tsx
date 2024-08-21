import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-96">
      <Link href="/">
        <h3><strong>gighub</strong></h3>
      </Link>
      <Link href="/map">
        <p>map</p>
      </Link>
      <Link href="/login">
        <p>login</p>
      </Link>
      <ModeToggle />
      <Link href="/profile">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
