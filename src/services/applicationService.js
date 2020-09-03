import config from "react-global-configuration";
import http from "./httpService";
import logger from "./logService";

export async function getApplications(token, userId) {
  let url = config.get("api.url") + "/Applications";
  if (userId !== undefined) url += "/user/" + userId;
  logger.log("applicationService.getApplications url", url);
  let returnValue = await http.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
  logger.log("applicationService.getApplications return", returnValue);
  return returnValue;
}

export async function getApplicationById(token, applicationId) {
  logger.log("applicationService.getApplications input", applicationId);
  let returnValue = await http.get(
    config.get("api.url") + "/Applications/" + applicationId,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  logger.log("applicationService.getApplications return", returnValue);
  return returnValue;
}

export async function addApplication(token, application) {
  logger.log("applicationService.getApplications input", application);
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
  logger.log("deleteApplication input id:", id);
  let returnValue = await http.delete(
    config.get("api.url") + "/Applications/" + id,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  logger.log("deleteApplication return:", returnValue);
  return returnValue;
}

export async function updateApplicationStatus(token, applicationStatus) {
  logger.log("updateApplicationStatus input:", applicationStatus);
  let returnValue = await http.put(
    config.get("api.url") + "/Applications/status",
    applicationStatus,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  logger.log("updateApplicationStatus return:", returnValue);
  return returnValue;
}

export async function getApplicationStatuses(token) {
  logger.log("getApplicationStatuses input", token);
  let returnValue = await http.get(
    config.get("api.url") + "/Applications/status",
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  logger.log("getApplicationStatuses return:", returnValue);
  return returnValue;
}
