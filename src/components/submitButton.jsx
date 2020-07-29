import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";

class SubmitButton extends Component {
  state = {};
  render() {
    const { disabled, spinner, text } = this.props;
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
  }
}

export default SubmitButton;
