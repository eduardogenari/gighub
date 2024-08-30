import { Event } from "@/types/event";
import * as React from "react";
import { Html, Body, Section, Text, Img, Heading } from "@react-email/components";

interface EmailTemplateTestProps {
  event: Event;
}

export const EmailTemplateTest: React.FC<Readonly<EmailTemplateTestProps>> = ({
  event,
}) => (
  <Html>
    <Body>
      <Section className="flex justify-center items-center min-h-screen bg-gray-100">
        <Section className="w-full max-w-[400px] p-4 bg-white rounded-lg shadow-md">
          <Section className="text-center">
            <Img
              alt="Braun Collection"
              className="w-full rounded-[12px] object-cover"
              height={320}
              src={event.image[0].url}
            />
          </Section>
          <Section className="mt-[32px] text-center">
            <Heading
              as="h1"
              className="text-[24px] md:text-[36px] font-semibold leading-[32px] md:leading-[40px] tracking-tight text-gray-900"
            >
              Your tickets for: {event.name}
            </Heading>
            <Text className="mt-[8px] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-gray-500">
              Date: {new Date(event.startDate).toLocaleDateString()}
            </Text>
            <Text className="mt-[8px] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-gray-500">
              Venue: {" "}
              {event.venue
                .map((venue) => `${venue.name}, ${venue.address}`)
                .join(", ")}
            </Text>
            <Text className="text-[14px] md:text-[16px] font-semibold leading-[20px] md:leading-[24px] text-gray-900">
              Price:{" "}
              {event.priceRange
                .filter((priceRange) => priceRange.type == "standard")
                .map((priceRange) => `${priceRange.min} ${priceRange.currency}`)
                .join(", ")}
            </Text>
          </Section>
        </Section>
      </Section>
    </Body>
  </Html>
);