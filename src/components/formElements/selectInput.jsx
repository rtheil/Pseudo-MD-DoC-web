import React from "react";
import { Form, Col } from "react-bootstrap";

export default function SelectInput({
  name,
  label,
  value,
  onChange,
  options = [
    { value: undefined, text: "" },
    { value: false, text: "No" },
    { value: true, text: "Yes" },
  ],
  error,
  as = Col,
}) {
  let className = "mr-sm-2";
  if (error) className += " form-error-field";
  return (
    <Form.Group as={as}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        className={className}
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
      {error && error !== "" && <div className="form-error">{error}</div>}
    </Form.Group>
  );
}
