import config from "react-global-configuration";
import http from "./httpService";

export async function getApplications(token, userId) {
  let url = config.get("api.url") + "/Applications";
  if (userId !== undefined) url += "/user/" + userId;
  console.log("applicationService.getApplications url", url);
  let returnValue = await http.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
  console.log("applicationService.getApplications return", returnValue);
  return returnValue;
}

export async function getApplicationById(token, applicationId) {
  console.log("applicationService.getApplications input", applicationId);
  let returnValue = await http.get(
    config.get("api.url") + "/Applications/" + applicationId,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  console.log("applicationService.getApplications return", returnValue);
  return returnValue;
}

export async function addApplication(token, application) {
  console.log("applicationService.getApplications input", application);
  let returnValue = await http.post(
    config.get("api.url") + "/Applications",
    application,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return returnValue;
}

export async function deleteApplication(token, id) {
  console.log("deleteApplication input id:", id);
  let returnValue = await http.delete(
    config.get("api.url") + "/Applications/" + id,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  console.log("deleteApplication return:", returnValue);
  return returnValue;
}
