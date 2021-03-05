import e from "cors";

const API_URL = "http://localhost:3000/api/v1/products/";
const API_URL_PRODUCTION =
  "https://dry-reef-08166.herokuapp.com/api/v1/products";
const API_URL_LOGIN = "http://localhost:3000/api/v1/users/login";
const API_URL_LOGIN_PRODUCTION =
  "https://dry-reef-08166.herokuapp.com/api/v1/users/login";
const HOME_PAGE_LIMIT = 4;

export {
  API_URL,
  HOME_PAGE_LIMIT,
  API_URL_PRODUCTION,
  API_URL_LOGIN,
  API_URL_LOGIN_PRODUCTION,
};
