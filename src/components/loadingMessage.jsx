import React from "react";

const LoadingMessage = ({ message }) => {
  if (message === undefined) message = "Loading...";
  //let message = "Loading...";
  return (
    <div className="m-4 d-flex justify-content-center">
      <aside className="loading-box">
        <div className="pl-2 loading-text">Loading...</div>
        <div className="loading-border">&nbsp;</div>
      </aside>
    </div>
  );
};

export default LoadingMessage;
