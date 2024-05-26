import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function getModelsTeacher(teacherId) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/models?teacher=${teacherId}`,
  });
}
