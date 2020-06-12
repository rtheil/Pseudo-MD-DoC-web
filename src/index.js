import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

//ReactDOM.render(<Testing />, document.getElementById("root"));
//ReactDOM.render(<Applications />, document.getElementById("root"));
//ReactDOM.render(<Application />, document.getElementById("root"));
//ReactDOM.render(<Home />, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
