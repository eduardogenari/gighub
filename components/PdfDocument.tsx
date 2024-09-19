import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Event } from "@/types/event";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "215px",
    paddingRight: 1,
  },
  text: {
    fontSize: 12,
    fontFamily: "Open Sans",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: 600,
    marginBottom: 10,
  },
  image: {
    width: 400,
    aspectRatio: "3/2",
  },
  barCode: {
    width: 500,
    height: 25,
  },
  line: {
    margin: 0,
    padding: 0,
    borderTop: "1px solid black",
  },
});

type PdfDocumentProps = {
  event: Event;
};

const PdfDocument: React.FC<PdfDocumentProps> = ({ event }) => (
  <Document>
    <Page size="A4" style={stylesPDF.page}>
      <View style={stylesPDF.line}></View>
      <View style={stylesPDF.section}>
        <View style={stylesPDF.left}>
          <Text style={stylesPDF.title}>gighub</Text>
        </View>
        <Image
          style={stylesPDF.barCode}
          src="/images/bar.png"
        />
      </View>
      <View style={stylesPDF.line}></View>
      <View style={stylesPDF.section}>
        <View style={stylesPDF.left}>
          <Text style={stylesPDF.title}>{event.name}</Text>
          <Text style={stylesPDF.text}>
            Date: {new Date(event.startDate).toLocaleDateString()}
          </Text>
          <Text style={stylesPDF.text}>
            Artists: {event.artist.map((artist) => artist.name).join(", ")}
          </Text>
          <Text style={stylesPDF.text}>
            Venue:{" "}
            {event.venue
              .map((venue) => `${venue.name}, ${venue.address}`)
              .join(", ")}
          </Text>
          <Text style={stylesPDF.text}>Genre: {event.genre.join(", ")}</Text>
          <Text style={stylesPDF.text}>
            Price:{" "}
            {event.priceRange
              .filter((priceRange) => priceRange.type == "standard")
              .map((priceRange) => `${priceRange.min} ${priceRange.currency}`)
              .join(", ")}
          </Text>
        </View>
        <Image style={stylesPDF.image} src={event.image[0].url} />
      </View>
      <View style={stylesPDF.line}></View>
      <View style={stylesPDF.section}>
        <View style={stylesPDF.left}>
          <Text style={stylesPDF.text}>
            * Ticket not valid. This is a student project.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
