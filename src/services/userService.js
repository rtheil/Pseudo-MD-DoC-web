import Axios from "axios";
import config from "react-global-configuration";

//THIS IS UNNECESSARY
// export function logout() {
//   console.log("userService logout");
// }

export async function login(loginInfo) {
  console.log("userService login");
  console.log("login details:", loginInfo);
  let returnValue = {};
  await Axios.post(config.get("api.url") + "/users/authenticate", loginInfo)
    .then((response) => {
      if (response.status === 200) {
        console.log("server response:", response);
        console.log("response.data", response.data);
        returnValue = response.data;
      } else {
        console.log(
          "Authentication received response other than 200",
          response
        );
        returnValue = {};
      }
    })
    .catch((error) => {
      console.log(error.response);
      //const { message } = error.response.data;
      const message = "";
      if (message !== undefined) console.log("Error Message:", message);
      else {
        console.log("post error:", error.response.data.errors);
        console.log(error.response.data.errors.Password[0]); //"The Password field is required."
      }
      returnValue = {};
    });
  return returnValue;
}

export async function register(createInfo) {
  console.log("userService register", createInfo);
  let returnValue;
  await Axios.post(config.get("api.url") + "/users/register", createInfo)
    .then((response) => {
      if (response.status === 200) {
        console.log("server response:", response);
        console.log("response.data", response.data);
        returnValue = {};
      } else {
        console.log(
          "Authentication received response other than 200",
          response
        );
        returnValue = { error: response };
      }
    })
    .catch((error) => {
      //ERROR
      returnValue = { error: error };
    });
  return returnValue;
}

export function forgotPassword() {
  console.log("userService forgot password");
}
