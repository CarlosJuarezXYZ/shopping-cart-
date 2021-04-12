import { BASE_URL, apiFetch } from "./api_fetch.js";

export const listProducts = (category) =>
  apiFetch(`${BASE_URL}/products?q=${category}`, {
    method: "GET",
  });
