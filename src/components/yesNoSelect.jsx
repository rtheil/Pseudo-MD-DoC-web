import React from "react";
import { Form, Col } from "react-bootstrap";

const YesNoSelect = ({ name, label, value, size, onChange }) => {
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
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </Form.Control>
    </Form.Group>
  );
};

export default YesNoSelect;
