import React from "react";
import { Form, Button, Col } from "react-bootstrap";

export default function ButtonInput({
  name,
  label,
  text,
  variant = "primary",
  size,
  onClick,
}) {
  return (
    <Form.Group as={Col} controlId={name} sm={size}>
      <Form.Label size="sm">{label}</Form.Label>
      <br />
      <Button variant={variant} size="sm" onClick={onClick}>
        {text}
      </Button>
    </Form.Group>
  );
}
