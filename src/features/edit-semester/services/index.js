import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export function updateSemester(id, fields) {
  console.log(id, fields);
  return axios({
    method: "patch",
    url: `${SERVER_URL}/semesters/${id}`,
    data: fields,
  });
}

export function updateBatch(id, fields) {
  return axios({
    method: "patch",
    url: `${SERVER_URL}/batches/${id}`,
    data: fields,
  });
}

export function removeCourseFromBatch(batchId, courseId) {
  return axios({
    url: `${SERVER_URL}/batches/${batchId}/courses/${courseId}`,
    method: "delete",
  });
}
