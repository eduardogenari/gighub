import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  
export default function PdfDocument() {
  return (
    <Document>
    <Page size="A4" style={stylesPDF.page}>
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.title}>This is a sample PDF generated with React-pdf</Text>
        <Text>This PDF is generated using React-pdf and styled with Flexbox.</Text>
      </View>
    </Page>
  </Document>
  )
}
