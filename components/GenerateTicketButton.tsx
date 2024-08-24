"use client";

import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event";

type GenerateTicketButtonProps = {
  event: Event;
};

export default function GenerateTicketButton({ event }: GenerateTicketButtonProps) {
  
  const handleGeneratePDF = async () => {
    alert(`todo: generate pdf event id ${event.id}`);
  };
  
  /*const handleGeneratePDF = async () => {
    const response = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event_ticket_${event.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };*/

  return (
    <Button className="w-[200px] mt-10 mb-10" onClick={handleGeneratePDF}>
      Generate Event Ticket
    </Button>
  );
}