import Axios from "axios";
import config from "react-global-configuration";
import http from "./httpService";

export async function login(loginInfo) {
  console.log("userService login");
  console.log("login details:", loginInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/authenticate",
    loginInfo
  );
  console.log("user service val", returnValue);
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

export async function update(currentUser, updateInfo) {
  console.log("userService update", updateInfo);
  console.log("currentUser", currentUser);
  let returnValue;
  await Axios.put(
    config.get("api.url") + "/users/" + currentUser.id,
    updateInfo,
    { headers: { Authorization: "Bearer " + currentUser.token } }
  )
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

export async function verifyResetToken(token) {
  let returnValue = false;
  console.log("verifyForgotToken");
  await Axios.post(config.get("api.url") + "/users/verifyresettoken", {
    token: token,
  })
    .then((response) => {
      if (response.status === 200) returnValue = true;
    })
    .catch((error) => {
      //return false;
    });
  return returnValue;
}

export async function verifyRegisterToken(token) {
  let returnValue = false;
  console.log("verifyRegisterToken");
  await Axios.post(config.get("api.url") + "/users/verifyregistertoken", {
    token: token,
  })
    .then((response) => {
      if (response.status === 200) returnValue = true;
    })
    .catch((error) => {
      //return false;
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
