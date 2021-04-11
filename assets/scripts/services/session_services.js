import {BASE_URL,apiFetch} from './api_fetch.js'

export const loginFetch = (username, password) =>
  apiFetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

export const logoutFetch = () =>
  apiFetch(`${BASE_URL}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
  });
