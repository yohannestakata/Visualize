import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function createDepartment(fields) {
  return axios({
    url: `${SERVER_URL}/departments`,
    data: fields,
    method: "post",
  });
}
