import axios from "axios";

export async function signup(fields) {
  return axios({
    url: "http://localhost:3000/auth/signup",
    method: "post",
    data: fields,
  });
}

export async function verifyUser() {
  return axios({
    url: "http://localhost:3000/auth/signed-user",
    method: "get",
  });
}
