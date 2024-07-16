import commonAxios from "./commonAxios";
import Cookies from "js-cookie";
import router from "@/router";

export const postLogin = (requestBody) =>
  commonAxios
    .post("/login", requestBody)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        Cookies.set("accessToken", res.headers.authorization);
        commonAxios.defaults.headers.common[
          "Authorization"
        ] = `${res.headers.authorization}`;
        router.push("/search");
      } else {
        alert("로그인 실패");
      }
    })
    .catch((err) => {
      alert(err);
      console.error(err);
    });

export const getSearch = (params) =>
  commonAxios
    .get("/search?" + params.toString())
    .then((res) => {
      totalLists.value = res.data.totalLists;
      tableItems.value = res.data.users;
      numOfPage.value = Math.ceil(
        totalLists.value / inputMapForSearch.value.showList
      );
      console.log("성공", res);
    })
    .catch((res) => {
      console.log("실패", res);
    });

// register와 history api는 통합 후 추가
