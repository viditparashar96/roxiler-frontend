import axios from "axios";
// import { enf_conf } from "../config/env.config";

export const axios_instance = axios.create({
  baseURL: "https://rag-gvmp.onrender.com/api/v1",
  withCredentials: true,
});

axios_instance.interceptors.request.use(
  (config: any) => {
    const session = localStorage.getItem("session");
    if (session) {
      config.headers["Authorization"] = session;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
