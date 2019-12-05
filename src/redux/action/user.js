import axios from "axios";

export const login = dataLogin => {
  return {
    type: "LOGIN",
    payload: axios.post("http://localhost:3000/user/login", dataLogin, {
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };
};

export const register = dataRegister => {
  return {
    type: "REGISTER",
    payload: axios.post("http://localhost:3000/user/signup", dataRegister, {
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
