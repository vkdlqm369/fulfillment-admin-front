import axios from "axios";

const commonAxios = axios.create({
  baseURL: "http://localhost:8099/api",
  withCredentials: true,
  headers: {},
});

export default commonAxios;
