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

export async function forgotPassword(forgotInfo) {
  console.log("userService forgotPassword");
  let returnValue;
  console.log(forgotInfo);

  const forgotObject = {
    emailAddress: forgotInfo.emailAddress,
    fromEmail: "rtheil@codirt.com",
    fromName: "md-doc-web",
    subject: "Your Forgotten Password",
    forgotUrl: window.location.href,
    emailContent: "Here's a link to reset your password: [forgotUrl]",
  };
  console.log("forgotObject", forgotObject);
  await Axios.post(config.get("api.url") + "/users/forgot", forgotObject)
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
      console.log("ERROR", error.response);
      //ERROR
      returnValue = { error: error };
    });
  return returnValue;
}

export async function resetPassword(forgotInfo) {
  console.log("userService resetPassword");
  let returnValue;
  console.log("resetPassword:", forgotInfo);
  const resetObject = {
    token: forgotInfo.token,
    password: forgotInfo.password,
  };

  await Axios.post(config.get("api.url") + "/users/reset", resetObject)
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
      returnValue = { error: error };
    });

  return returnValue;
}