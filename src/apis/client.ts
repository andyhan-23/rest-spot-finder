import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://3.37.19.140:8080/api",
});

export default apiClient;
