import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function SubmitButton({
  text,
  loadingText = "Loading...",
  loading = false,
  variant = "primary",
  onClick,
  name,
}) {
  //add a space before loading text
  loadingText = <>&nbsp;{loadingText}</>;

  return (
    <Button
      variant={variant}
      type="submit"
      disabled={loading}
      onClick={onClick}
      name={name}
    >
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {loading ? loadingText : text}
    </Button>
  );
}
