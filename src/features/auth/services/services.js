import axios from "axios";

export default async function signup(fields) {
  return axios({
    url: "http://localhost:3000/auth/signup",
    method: "post",
    data: fields,
    withCredentials: true,
  });
}
