import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingMessage = ({ message }) => {
  if (message === undefined) message = "Loading...";
  //let message = "Loading...";
  return (
    <div className="d-flex justify-content-center m-3">
      <Spinner animation="border" role="status">
        <span className="sr-only">{message}</span>
      </Spinner>
      &nbsp;<h5>{message}</h5>
    </div>
  );
};

export default LoadingMessage;
