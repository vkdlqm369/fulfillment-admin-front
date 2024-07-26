import commonAxios from "./commonAxios";
<<<<<<< HEAD
import Cookies from "js-cookie";
=======
>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9

export const postLogin = async (requestBody) => {
  try {
    const res = await commonAxios.post("/login", requestBody);
    console.log("성공", res);
<<<<<<< HEAD
    Cookies.set("accessToken", res.headers.authorization);
    commonAxios.defaults.headers.common[
      "Authorization"
    ] = `${res.headers.authorization}`;
    return res.data;
  } catch (error) {
    console.error("로그인 오류가 발생했습니다.", error);
=======
    return res.data;
  } catch (error) {
    console.error("로그인 오류가 발생했습니다.", error.response);
>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9
    throw error;
  }
};

<<<<<<< HEAD
export const getSearch = async (params) => {
  try {
    const res = await commonAxios.get("/search?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 조회 오류가 발생했습니다.", error);
=======
export const postRegister = async (requestBody) => {
  try {
    const res = await commonAxios.post("/register", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 등록 오류가 발생했습니다.", error.response);
>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9
    throw error;
  }
};

<<<<<<< HEAD
=======
export const getSearch = async (params) => {
  try {
    const res = await commonAxios.get("/search?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 조회 오류가 발생했습니다.", error.response);
    throw error;
  }
};

>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9
export const getHistory = async (params) => {
  try {
    const res = await commonAxios.get("/history?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
<<<<<<< HEAD
    console.error("히스토리 조회 오류가 발생했습니다.", error);
=======
    console.error("히스토리 조회 오류가 발생했습니다.", error.response);
>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9
    throw error;
  }
};

<<<<<<< HEAD
=======
export const getAuthority = async () => {
  try {
    const res = await commonAxios.get("/authority");
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("권한 조회 오류가 발생했습니다.", error.response);
    throw error;
  }
};

export const deleteUser = async (requestBody) => {
  try {
    const res = await commonAxios.delete("/delete", requestBody)
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("삭제 오류가 발생했습니다.", error.response);
    throw error;
  }
}

export const updateOtherUser = async (requestBody) => {
  try {
    const res = await commonAxios.patch("/update/others", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("다른 사람 정보 수정 오류가 발생했습니다.", error.response);
    throw error;
  }
}

>>>>>>> 477a2489cb0fbc8eb21ce63428b17a9a1e2b2dd9
// register는 통합 후 추가
