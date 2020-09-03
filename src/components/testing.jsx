import React from "react";
import LoadingMessage from "./loadingMessage";
import logger from "../services/logService";

export default function Testing() {
  logger.log("test", "test2");
  return <LoadingMessage />;
}
