import { Event } from "@/types/event";
import * as React from "react";
import {
  Html,
  Body,
  Section,
  Text,
  Img,
  Container,
} from "@react-email/components";

interface EmailTemplateTestProps {
  event: Event;
}

export const EmailTemplateTest: React.FC<Readonly<EmailTemplateTestProps>> = ({
  event,
}) => (
  <Html>
    <Body>
      <Container className="w-full flex justify-center items-center min-h-screen">
        <Section className="w-full max-w-[500px] p-4 mt-8 mb-8">
          <Img
            alt="Braun Collection"
            className="w-full object-cover"
            height={320}
            src={event.image[0].url}
          />
        </Section>
        <Section className="w-full max-w-[500px] p-4 mt-8">
          <Text className="w-full max-w-[500px] text-[18px] md:text-[16px] leading-[18px] md:leading-[16px] font-semibold tracking-tight">
            <strong>{event.name}</strong>
          </Text>
          <Text className="text-[18px] md:text-[16px] leading-[18px] md:leading-[16px]">
            Date: {new Date(event.startDate).toLocaleDateString()}
          </Text>
          <Text className="text-[18px] md:text-[16px] leading-[18px] md:leading-[16px]">
            Venue:{" "}
            {event.venue
              .map((venue) => `${venue.name}, ${venue.address}`)
              .join(", ")}
          </Text>
          <Text className="text-[18px] md:text-[16px] leading-[18px] md:leading-[16px]">
            Price:{" "}
            {event.priceRange
              .filter((priceRange) => priceRange.type == "standard")
              .map((priceRange) => `${priceRange.min} ${priceRange.currency}`)
              .join(", ")}
          </Text>
          <Text className="text-[18px] md:text-[16px] leading-[18px] md:leading-[16px] font-semibold tracking-tight text-black">
            <strong>GigHub</strong>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
