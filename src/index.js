import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import config from "react-global-configuration";

//DEV CONFIG
config.set({ api: { url: "https://localhost:5001/api" } }, { freeze: false });

//PROD CONFIG
config.set(
  { api: { url: "https://md-doc-api.azurewebsites.net/api" } },
  { environment: "production" }
);

//UNCOMMENT DURING TESTING
config.setEnvironment("production");

//console.log("API URL:", config.get("api.url"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
