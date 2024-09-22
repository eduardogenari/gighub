import Stripe from "stripe";
import prisma from "../lib/prisma";
import { Event as EventType } from "@/types/event";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getProductDetailsFromSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const lineItems = session.line_items?.data;

    if (!lineItems || lineItems.length === 0) {
      throw new Error("No line items found in session");
    }

    const lineItem = lineItems[0];

    if (lineItem.price?.product) {
      const product = await stripe.products.retrieve(
        lineItem.price.product as string
      );

      const metadata = product.metadata;
      const idFromMetadata = metadata.id;

      let event = await prisma.event.findUnique({
        where: { id: Number(idFromMetadata) },
        include: {
          artist: true,
          venue: true,
          priceRange: true,
          image: true,
        },
      });

      if (!event) {
        throw new Error("Event not found in database");
      }

      return event as EventType;
    }
    throw new Error("No product found for line item");
  } catch (error) {
    console.error("Error retrieving product metadata:", error);
    throw error;
  }
}
