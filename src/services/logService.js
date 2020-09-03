import config from "react-global-configuration";
function init() {}

function log(...data) {
  if (config.get("consoleLogging")) console.log(...data);
}

export default { init, log };
