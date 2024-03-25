import axios from "axios";
import URL from "./constant";

const apiClient = axios.create({
  baseURL: URL.base,
});

export default apiClient;
