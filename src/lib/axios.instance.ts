import axios from "axios";
import { getCookie } from "./utils";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10 * 60 * 60 * 1000,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const { contentType } = config.headers;

    if (contentType) {
      config.headers["Content-Type"] = contentType;
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
