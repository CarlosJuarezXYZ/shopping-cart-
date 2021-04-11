import {BASE_URL,apiFetch} from './api_fetch.js'
export const createUser = (username, password,birthday,gender) =>
  apiFetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password, birthday, gender }),
  });
