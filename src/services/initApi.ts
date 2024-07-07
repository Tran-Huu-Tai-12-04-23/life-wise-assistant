import { getAccessToken } from "@/helper";
import axios from "axios";
const initApi = (url: string, headers = {}) => {
  if (url === "") throw new Error("url not found");
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers,
    },
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // console.log("AsyncStorage error:", error);
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      // console.log(
      //   "\x1b[31m",
      //   "ERROR REQUEST URL:",
      //   error.config?.baseURL + error.config.url
      // );
      // console.log("\x1b[31m", "ERROR REQUEST Body:", error.config.data);
      // console.log(
      //   "\x1b[31m",
      //   "ERROR REQUEST Headers:",
      //   error?.response?.data?.message
      // );
      return Promise.reject({ message: error?.response?.data?.message });
    }
  );

  return api;
};

export default initApi;
