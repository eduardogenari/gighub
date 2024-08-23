import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-96">
      <Link href="/">
        <h3><strong>gighub</strong></h3>
      </Link>
      <Link href="/events">
        <p>events</p>
      </Link>
      <ModeToggle />
      <Link href="/login">
        <Avatar className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
