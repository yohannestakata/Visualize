import axios from "axios";
import { SERVER_URL } from "../data/globals";

export function getSemesters() {
  return axios({
    url: `${SERVER_URL}/semseters`,
    method: "get",
  });
}
