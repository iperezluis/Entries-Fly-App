import axios from "axios";

const apiEntry = axios.create({
  baseURL: "/api",
});

export default apiEntry;
