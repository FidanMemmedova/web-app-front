import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PATH } from "../../Data/common";

const api = axios.create({
  baseURL: API_PATH || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export async function serviceFetch<T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}