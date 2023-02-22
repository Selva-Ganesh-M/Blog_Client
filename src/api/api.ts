import axios from "axios";

export type TPayload<T> = {
  statusText: string;
  statusCode: number;
  message: string;
  payload: T;
};

export const api = axios.create({
  baseURL: "https://blog-app-server-m2bg.onrender.com/api",
  // timeout: 1000*3,
  withCredentials: true,
  headers: { "X-Custom-Header": "foobar" },
});
