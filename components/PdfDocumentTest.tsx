import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Event } from '@/types/event';

const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

type PdfDocumentTestProps = {
    event: Event;
  };

  const PdfDocumentTest: React.FC<PdfDocumentTestProps> = ({ event }) => (
  <Document>
    <Page size="A4" style={stylesPDF.page}>
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>Event Details: {event.name}</Text>
        <Text>Date: {new Date(event.startDate).toLocaleDateString()}</Text>
        <Text>Artists: {event.artist.map((artist) => artist.name).join(", ")}</Text>
        <Text>Venue: {event.venue.map((venue) => `${venue.name}, ${venue.address}`).join(", ")}</Text>
        <Text>Genre: {event.genre.join(", ")}</Text>
        <Text>Price: {event.priceRange.filter((priceRange) => priceRange.type == "standard").map((priceRange) => `${priceRange.min} ${priceRange.currency}`).join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocumentTest;