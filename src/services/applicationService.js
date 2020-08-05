import config from "react-global-configuration";
import http from "./httpService";

export async function getApplications(token, userId) {
  let url = config.get("api.url") + "/Applications";
  if (userId !== undefined) url += "/user/" + userId;
  console.log("applicationService getApplications url", url);
  let returnValue = await http.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
  console.log("appservice response", returnValue);
  return returnValue;
}

export async function deleteApplication(token, userId) {
  //let returnValue;
}
