import axios from "axios";
import { config } from "../../config/config";

export const login = dataLogin => {
  return {
    type: "LOGIN",
    payload: axios.post(config.BASE_URL + "/user/login", dataLogin, {
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };
};

export const register = dataRegister => {
  return {
    type: "REGISTER",
    payload: axios.post(config.BASE_URL + "/user/signup", dataRegister, {
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };
};

export const keepLogin = (userName, token) => {
  return {
    type: "KEEP_LOGIN",
    userName,
    token
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};
