import axios from "axios";

export async function signup(fields) {
  return axios({
    url: "http://localhost:3000/auth/signup",
    method: "post",
    data: fields,
  });
}

export async function login(fields) {
  return axios({
    method: "post",
    url: "http://localhost:3000/auth/login",
    data: fields,
  });
}

export async function verifyUser() {
  console.log("Verifying...");
  return axios({
    url: "http://localhost:3000/auth/signed-user",
    method: "get",
  });
}
