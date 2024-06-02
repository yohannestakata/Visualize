import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

export async function signup(fields) {
  return axios({
    url: `${SERVER_URL}/auth/signup`,
    method: "post",
    data: fields,
  });
}

export async function login(fields) {
  return axios({
    method: "post",
    url: `${SERVER_URL}/auth/login`,
    data: fields,
  });
}

export async function verifyUser() {
  console.log("Verifying...");
  return axios({
    url: `${SERVER_URL}/auth/signed-user`,
    method: "get",
  });
}
