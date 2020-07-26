import React from "react";
import { Button, Spinner } from "react-bootstrap";

const SubmitButton = ({ disabled, spinner, text }) => {
  return (
    <Button variant="primary" type="submit" disabled={disabled}>
      {spinner && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {text}
    </Button>
  );
};

export default SubmitButton;
