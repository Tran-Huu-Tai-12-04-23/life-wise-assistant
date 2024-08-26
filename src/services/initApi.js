import axios from 'axios';
import { getAccessToken } from '../helper/index';

class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const initApi = (url, headers = {}) => {
  if (url === '') throw new Error('url not found');
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
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
    (response) => response.data,
    (error) => {
      const errorMessage = error?.response?.data?.message;
      const errorCode = error?.response?.status;
      return Promise.reject(new ApiError(errorMessage, errorCode));
    }
  );

  return api;
};

export default initApi;
