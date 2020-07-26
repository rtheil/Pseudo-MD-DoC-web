import React from "react";
import { Form, Col, Alert } from "react-bootstrap";
//import { Redirect } from "react-router-dom";

const TextInput = ({
  name,
  label,
  type,
  onChange,
  value,
  size,
  error,
  col,
  text,
}) => {
  //console.log(name, error);

  //DEFAULTS
  if (type === undefined) type = "text";
  if (col === undefined) col = Col;

  //RETURN
  return (
    <Form.Group as={col} controlId={name} sm={size}>
      <Form.Label size="sm">{label}</Form.Label>
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
      <Form.Text>{text}</Form.Text>
    </Form.Group>
  );
};

export default TextInput;
