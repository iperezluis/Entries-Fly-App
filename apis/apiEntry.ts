import axios from "axios";

const apiEntry = axios.create({
  baseURL: `${process.env.HOSTNAME}:3000/api`,
});

export default apiEntry;
