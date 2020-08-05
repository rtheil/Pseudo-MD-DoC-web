import Axios from "axios";
import config from "react-global-configuration";
import http from "./httpService";

export async function login(loginInfo) {
  console.log("userService.login input:", loginInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/authenticate",
    loginInfo
  );
  console.log("userService.login return:", returnValue);
  return returnValue;
}

export async function register(createInfo) {
  console.log("userService.register input:", createInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/register",
    createInfo
  );
  console.log("userService.register return:", returnValue);
  return returnValue;
}

export async function update(currentUser, updateInfo) {
  console.log("userService.update input:", updateInfo);
  let returnValue = await http.put(
    config.get("api.url") + "/users/" + currentUser.id,
    updateInfo,
    { headers: { Authorization: "Bearer " + currentUser.token } }
  );
  console.log("userService.update return:", returnValue);
  return returnValue;
}

export async function forgotPassword(forgotInfo) {
  console.log("userService.forgotPassword input:", forgotInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/forgot",
    forgotInfo
  );
  console.log("userService.forgotPassword return:", returnValue);
  return returnValue;
}

export async function resetPassword(forgotInfo) {
  console.log("userService resetPassword input:", forgotInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/reset",
    forgotInfo
  );
  console.log("userService resetPassword return:", returnValue);
  return returnValue;
}

export async function verifyResetToken(token) {
  console.log("userService.verifyResetToken input:", token);
  let returnValue = false;
  let task = await http.post(
    config.get("api.url") + "/users/verifyresettoken",
    {
      token: token,
    }
  );
  if (task.status === 200) returnValue = true;
  console.log("userService.verifyResetToken return:", returnValue);
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
