import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function createBatch(fields) {
  return axios({
    data: fields,
    method: "post",
    url: `${SERVER_URL}/batches`,
  });
}
