import commonAxios from "./commonAxios";
import Cookies from "js-cookie";


export const postLogin = async (requestBody) => {
  try {
    const res = await commonAxios.post("/login", requestBody);
    console.log("성공", res);
    Cookies.set("accessToken", res.headers.authorization);
    commonAxios.defaults.headers.common[
      "Authorization"
    ] = `${res.headers.authorization}`;
    return res.data;
  }catch (error) {
    console.error("로그인 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};


export const postRegister = async (requestBody) => {
  try {
    const res = await commonAxios.post("/register", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 등록 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};

export const getSearch = async (params) => {
  try {
    const res = await commonAxios.get("/search?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("유저 조회 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};

export const getHistory = async (params) => {
  try {
    const res = await commonAxios.get("/history?" + params.toString());
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("히스토리 조회 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};


export const getAuthority = async () => {
  try {
    const res = await commonAxios.get("/authority");
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("권한 조회 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};

export const deleteUser = async (requestBody) => {
  try {
    const res = await commonAxios.delete("/delete", requestBody)
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("삭제 오류가 발생했습니다.", error.response);
    throw error.response;
  }
}

export const updateOtherUser = async (requestBody) => {
  try {
    const res = await commonAxios.patch("/update/others", requestBody);
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("다른 사람 정보 수정 오류가 발생했습니다.", error.response);
    throw error.response;
  }
};

export const patchApprove = async (requestBody) => {
  try {
    console.log(commonAxios.defaults);
    const res = await commonAxios.patch("/update/approve", {
      ids: requestBody,
    });
    console.log("성공", res);
    return res.data;
  } catch (error) {
    console.error("승인 오류가 발생했습니다.", error.response);
    throw error.response;
  }
}

  export const getMyInfo = async (id) => {
    try{
      console.log(id)
      const res = await commonAxios.get(`/mypage/${id}`);
      console.log(res)
      return res.data
    }catch(error) {
      console.error("사용자 정보 조회 오류가 발생했습니다.", error.response);
      throw error.response;
    }
  };

  export const checkPassword = async(requestBody) => {
    try{
      const res = await commonAxios.post("/checkpassword", requestBody);
      console.log(res)
      return res
    }catch(error) {
      console.error("비밀번호 검증 오류가 발생하였습니다", error.response);
      throw error.response;
    }
  };
  
  export const updateProfile = async(requestBody) => {
    try{
      const res = await commonAxios.patch("/update/me", requestBody)
      console.log(res)
      return res
    }catch(error) {
      console.error("회원정보 수정 오류가 발생하였습니다", error.response);
      throw error.response;
    }
  }

  export const updatePassword = async(requestBody) => {
    try{
      const res = await commonAxios.patch("/update/password", requestBody);
      console.log(res)
      return res
    }catch(error) {
      console.error("비밀번호 업데이트 오류가 발생하였습니다", error.response);
      throw error;
      throw error.response;
    }


};
