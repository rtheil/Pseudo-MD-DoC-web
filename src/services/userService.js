import Axios from "axios";
import config from "react-global-configuration";
import http from "./httpService";
import logger from "./logService";

export async function login(loginInfo) {
  logger.log("userService.login input:", loginInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/authenticate",
    loginInfo
  );
  logger.log("userService.login return:", returnValue);
  return returnValue;
}

export async function register(createInfo) {
  logger.log("userService.register input:", createInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/register",
    createInfo
  );
  logger.log("userService.register return:", returnValue);
  return returnValue;
}

export async function update(currentUser, updateInfo) {
  logger.log("userService.update input:", updateInfo);
  let returnValue = await http.put(
    config.get("api.url") + "/users/" + currentUser.id,
    updateInfo,
    { headers: { Authorization: "Bearer " + currentUser.token } }
  );
  logger.log("userService.update return:", returnValue);
  return returnValue;
}

export async function forgotPassword(forgotInfo) {
  logger.log("userService.forgotPassword input:", forgotInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/forgot",
    forgotInfo
  );
  logger.log("userService.forgotPassword return:", returnValue);
  return returnValue;
}

export async function resetPassword(forgotInfo) {
  logger.log("userService resetPassword input:", forgotInfo);
  let returnValue = await http.post(
    config.get("api.url") + "/users/reset",
    forgotInfo
  );
  logger.log("userService resetPassword return:", returnValue);
  return returnValue;
}

export async function verifyResetToken(token) {
  logger.log("userService.verifyResetToken input:", token);
  let returnValue = false;
  let task = await http.post(
    config.get("api.url") + "/users/verifyresettoken",
    {
      token: token,
    }
  );
  if (task.status === 200) returnValue = true;
  logger.log("userService.verifyResetToken return:", returnValue);
  return returnValue;
}

export async function verifyRegisterToken(token) {
  let returnValue = false;
  logger.log("verifyRegisterToken");
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
