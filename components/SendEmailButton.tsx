"use client";

import React from "react";
import { Button } from "./ui/button";
import { Event } from "@/types/event";

type SendEmailButtonProps = {
  event: Event;
};

const SendEmailButton: React.FC<SendEmailButtonProps> = ({ event }) => {
  const sendEmail = async () => {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event }),
    });

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
    }
  };

  return (
    <Button onClick={sendEmail} className="w-[200px]">
      Send Email
    </Button>
  );
};

export default SendEmailButton;