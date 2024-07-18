import axios from "axios";
import Cookies from "js-cookie";

const commonAxios = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
  headers: {},
});

commonAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error);

    if (error.response.status === 401) {
      Cookies.remove("accessToken");
      await router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default commonAxios;
