import React from "react";
import { Form, Col } from "react-bootstrap";

export default function SelectInput({
  name,
  label,
  value,
  onChange,
  options = [
    { value: false, text: "No" },
    { value: true, text: "Yes" },
  ],
}) {
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        className="mr-sm-2"
        // sm={size}
        size="sm"
        id={name}
        custom
        onChange={onChange}
        value={value}
      >
        {options.map((option, i) => (
          <option value={option.value} key={i}>
            {option.text}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
