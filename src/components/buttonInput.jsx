import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const ButtonInput = ({ name, label, text, variant, size, onClick }) => {
  if (!variant) variant = "primary";
  return (
    <Form.Group as={Col} controlId={name} sm={size}>
      <Form.Label size="sm">{label}</Form.Label>
      <br />
      <Button variant={variant} size="sm" onClick={onClick}>
        {text}
      </Button>
    </Form.Group>
  );
};

export default ButtonInput;
