import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";

class SubmitButton extends Component {
  render() {
    let { text, loadingText, loading, variant } = this.props;
    if (loadingText === undefined) loadingText = "Loading...";
    if (variant === undefined) variant = "primary";

    //add a space before loading text
    loadingText = <React.Fragment>&nbsp;{loadingText}</React.Fragment>;

    return (
      <Button variant={variant} type="submit" disabled={loading}>
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
}

export default SubmitButton;
