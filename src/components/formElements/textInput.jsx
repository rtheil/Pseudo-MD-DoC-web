import React from "react";
import { Form, Col, Alert as div } from "react-bootstrap";

export default function TextInput({
  name,
  label,
  type = "text",
  onChange,
  value,
  size,
  error,
  as = Col,
  text,
}) {
  let className = "";
  if (error) className = "form-error-field";

  //RETURN
  return (
    <Form.Group as={as} controlId={name} sm={size}>
      <Form.Label size="sm">{label}</Form.Label>
      <Form.Control
        placeholder={label}
        onChange={onChange}
        value={value}
        size="sm"
        type={type}
        className={className}
      />
      {error && error !== "" && <div className="form-error">{error}</div>}
      <Form.Text>{text}</Form.Text>
    </Form.Group>
  );
}
