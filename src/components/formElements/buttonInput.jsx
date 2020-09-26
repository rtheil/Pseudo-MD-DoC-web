import React from "react";
import { Form, Button, Col } from "react-bootstrap";

export default function ButtonInput({
  name,
  label,
  text,
  variant = "primary",
  size,
  onClick,
  idx,
}) {
  return (
    <Form.Group as={Col} controlId={name} sm={size}>
      {label && (
        <>
          <Form.Label size={size}>{label}</Form.Label>
          <br />
        </>
      )}
      <Button variant={variant} size={size} onClick={onClick} idx={idx}>
        {text}
      </Button>
    </Form.Group>
  );
}
