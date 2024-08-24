// components/BuyTicketButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";

type BuyTicketButtonProps = {
  event: Event;
};

export default function BuyTicketButton({ event }: BuyTicketButtonProps) {
  const handleButtonClick = () => {
    alert(`to stripe: event id ${event.id}`);
  };

  return (
    <Button className="w-[200px] mt-20 mb-10" onClick={handleButtonClick}>
      Buy Ticket
    </Button>
  );
}