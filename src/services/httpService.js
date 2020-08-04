import axios from "axios";

axios.interceptors.response.use(
  // null,
  (response) => {
    //success
    console.log("httpService success:", response);
    return Promise.resolve(response);
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    //console.log("expected error:", error.response.data.message);
    if (expectedError) {
      console.log("interceptor error:", error);
      //return Promise.reject({ error: error.response.data.message });
      //return { error: error.response.data.message };
    }
    console.log("unexpected error:", error.response);
    if (error.response)
      return Promise.reject({ error: error.response.data.message });
    else return { error: "No response from server" };
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
