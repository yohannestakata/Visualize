import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function uploadModel(fields) {
  const formData = new FormData();

  for (const fieldName in fields) {
    if (typeof fields[fieldName] === "string")
      formData.append(fieldName, fields[fieldName]);

    if (typeof fields[fieldName] === "object")
      formData.append(fieldName, fields[fieldName], fields[fieldName].name);
  }

  console.log(formData.get("thumbnail"));

  return axios({
    method: "post",
    url: `${SERVER_URL}/models/upload`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
