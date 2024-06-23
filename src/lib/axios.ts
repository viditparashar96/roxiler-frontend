import axios from "axios";
import { env_config } from "../config/env_config";

export const axios_instance = axios.create({
  baseURL: env_config.api_url,
  withCredentials: true,
});

export default axios_instance;
