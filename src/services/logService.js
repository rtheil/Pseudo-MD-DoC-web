import config from "react-global-configuration";
import * as Sentry from "@sentry/react";

function init() {}

function log(...data) {
  if (config.get("consoleLogging")) console.log(...data);
}

function error(...data) {
  log("ERROR", ...data);
  Sentry.captureException(new Error(...data));
}

export default { init, log, error };
