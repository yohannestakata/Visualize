import axios from "axios";
import { SERVER_URL } from "../data/globals";

export function getBatches() {
  return axios({
    url: `${SERVER_URL}/batches`,
    method: "get",
  });
}
