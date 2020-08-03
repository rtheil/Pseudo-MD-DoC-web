import Axios from "axios";
import config from "react-global-configuration";

export async function getApplications(token, userId) {
  let returnValue;
  let url = config.get("api.url") + "/Applications";
  if (userId !== undefined) url += "/user/" + userId;
  console.log("getApplications url", url);
  await Axios.get(url, {
    headers: { Authorization: "Bearer " + token },
  })
    .then((response) => {
      const applications = response.data;
      returnValue = applications;
    })
    .catch((error) => {
      returnValue = { error: error.message };
    });
  return returnValue;
}
