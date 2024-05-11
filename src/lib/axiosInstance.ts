import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants/constantUrl";

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosInstanceBasic = axios.create(config);
