import axios from "axios";

axios.interceptors.response.use(success, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response < 500;
  if (!expectedError) {
    return Promise.reject(error);
    console.log("unexpected error:", error);
  }
  //console.log("interceptor error:", error);
  return Promise.reject(error);
});

function registerUser() {}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
