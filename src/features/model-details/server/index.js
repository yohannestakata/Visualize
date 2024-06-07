import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function deleteModel(id) {
  return axios({
    url: `${SERVER_URL}/models/${id}`,
    method: "delete",
  });
}
