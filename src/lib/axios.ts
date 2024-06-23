import axios from "axios";

export const axios_instance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default axios_instance;
