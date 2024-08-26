import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  id: string;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  id,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Receipt for id {id}</p>
  </div>
);
