import axios from "axios";
import { config } from "../../config/config";

export const getCompanies = query => {
  console.log("GET --> http://localhost:3000/company/");
  return {
    type: "GET_COMPANIES",
    payload: axios({ method: "GET", url: config.BASE_URL + "/company/" })
  };
};
