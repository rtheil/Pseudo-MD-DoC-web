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
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    //logger.log("expected error:", error.response.data.message);
    if (expectedError) {
      logger.log("interceptor error:", error);
      //return Promise.reject({ error: error.response.data.message });
      //return { error: error.response.data.message };
    }
    logger.log("unexpected error:", error.response);
    if (error.response)
      return {
        error: error.response.data.message,
        status: error.response.status,
      };
    else return { error: "No response from server", status: 500 };
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
