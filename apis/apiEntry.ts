import axios from "axios";

const apiEntry = axios.create({
  baseURL: `${process.env.HOSTNAME}/api`,
});

export default apiEntry;
