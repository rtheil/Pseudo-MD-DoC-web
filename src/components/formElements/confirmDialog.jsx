import React from "react";
import { Alert, Button } from "react-bootstrap";

export default function ConfirmDialog({ message, handleYes, handleNo, id }) {
  return (
    <Alert variant="danger">
      <span className="pr-4">{message}</span>
      <Button
        variant="success"
        size="sm"
        onClick={handleYes}
        id={id}
        className="pl-4 pr-4"
      >
        Yes
      </Button>{" "}
      <Button
        variant="danger"
        size="sm"
        className="pl-4 pr-4"
        onClick={handleNo}
        id={id}
      >
        No
      </Button>
    </Alert>
  );
}
