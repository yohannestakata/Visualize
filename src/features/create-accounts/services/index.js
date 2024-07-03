import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function createUser(fields) {
  return axios({
    url: `${SERVER_URL}/users`,
    method: "post",
    data: fields,
  });
}
