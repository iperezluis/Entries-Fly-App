import axios from "axios";

const apiEntry = axios.create({
  baseURL: `${process.env.HOSTNAME}:8080/api`,
});

export default apiEntry;
