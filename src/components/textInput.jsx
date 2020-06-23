import React from "react";
import { Form, Col } from "react-bootstrap";

const TextInput = ({ name, label, type, onChange, value, size }) => {
  return (
    <Form.Group as={Col} controlId={name} sm={size}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
      />
    </Form.Group>
  );
};

export default TextInput;
