import React from "react";
import { Form, Col, Alert } from "react-bootstrap";
//import { Redirect } from "react-router-dom";

const TextInput = ({ name, label, type, onChange, value, size, error }) => {
  //console.log(name, error);
  if (type === "") type = "text";
  return (
    <Form.Group as={Col} controlId={name} sm={size}>
      <Form.Label size="sm">{label}</Form.Label>
      {/* <span className="error-box">ERROR</span> */}
      <Form.Control
        placeholder={label}
        onChange={onChange}
        value={value}
        size="sm"
        type={type}
      />
      {error && error !== "" && (
        <Alert variant="danger" className="pt-0 pb-0 pr-0 pl-1 m-1">
          {error}
        </Alert>
      )}
    </Form.Group>
  );
};

export default TextInput;
