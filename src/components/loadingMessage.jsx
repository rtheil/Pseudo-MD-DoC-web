import React from "react";

export default function LoadingMessage({ message = "Loading..." }) {
  return (
    <div className="m-4 d-flex justify-content-center">
      <aside className="loading-box">
        <div className="pl-2 loading-text">{message}</div>
        <div className="loading-border">&nbsp;</div>
      </aside>
    </div>
  );
}
