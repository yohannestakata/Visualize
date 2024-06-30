import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function updateDepartment(id, fields) {
  return axios({
    url: `${SERVER_URL}/departments/${id}`,
    data: fields,
    method: "patch",
  });
}
