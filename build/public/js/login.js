import "@babel/polyfill";
import "regenerator-runtime";
import axios from "axios";
import { API_URL_LOGIN_PRODUCTION } from "./config";
export const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: API_URL_LOGIN_PRODUCTION,
      data: {
        email,
        password,
      },
    });
    // const token = result.data.token;
    const { user } = result.data.data;
    if (user) {
      setTimeout(() => {
        window.location.assign("/home?page=1&limit=4");
      }, 200);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  return await axios.get("http://localhost:3000/api/v1/users/logout");
};
