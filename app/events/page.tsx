import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function EventsPage() {
  return (
    <div>
      <h1>events</h1>
      <Card>
        <p>jjj</p>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Paul McCartney en Madrid con su “Got Back Tour”</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
