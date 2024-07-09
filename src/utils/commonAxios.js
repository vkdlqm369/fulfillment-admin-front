import axios from "axios";

const commonAxios = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
  headers: {},
});

export default commonAxios;
