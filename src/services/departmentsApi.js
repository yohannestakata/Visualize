import axios from "axios";
import { SERVER_URL } from "../data/globals";

export function getDepartments() {
  return axios({
    url: `${SERVER_URL}/departments`,
    method: "get",
  });
}
