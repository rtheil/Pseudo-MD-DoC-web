import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(
  // null,
  (response) => {
    //success
    logger.log("httpService success:", response);
    return Promise.resolve(response);
  },
  (error) => {
    // const expectedError =
    //   error.response &&
    //   error.response.status >= 400 &&
    //   error.response.status < 500;
    // if (expectedError) {
    //   logger.error("interceptor error:", error);
    // }
    if (error.response) {
      logger.log("http service error:", error.response);

      if (error.response.data.innerException)
        logger.error("http service error:", error.response.data.innerException);
      if (error.response.data.message)
        logger.error("http service error:", error.response.data.message);
      else if (error.response.data.errors)
        logger.error("http service error:", error.response.data.errors);
      else logger.error("http service error:", error.response);

      return {
        error: error.response.data.message,
        status: error.response.status,
      };
    } else {
      logger.error("No response from server");
      return { error: "No response from server", status: 500 };
    }
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
