import axios from "axios";
import URL from "./constant";

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? `${URL.base}` : "https://restspotfinder.site/api",
});

export default apiClient;
