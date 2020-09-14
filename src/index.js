import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import config from "react-global-configuration";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

//SENTRY
Sentry.init({
  dsn:
    "https://34dc7faf811141fb8bf25024c8fbb6d2@o442970.ingest.sentry.io/5415790",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0, //performance
});

//DEV CONFIG
config.set(
  {
    api: { url: "https://localhost:5001/api" },
    helperValues: true,
    consoleLogging: true,
  },
  { freeze: false }
);

//PROD CONFIG
config.set(
  {
    api: { url: "https://md-doc-api.azurewebsites.net/api" },
    helperValues: false,
    consoleLogging: true,
  },
  { environment: "production" }
);

if (process.env.NODE_ENV === "production")
  config.setEnvironment(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
