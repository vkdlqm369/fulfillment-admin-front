<script setup></script>
<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <v-card class="mb-10" width="400" color="transparent">
      <v-img
        src="https://wms.sbfulfillment.co.kr/wms/asset/images/logo_fbs_w.svg"
      ></v-img>
    </v-card>

    <v-sheet width="400" color="transparent">
      <v-form fast-fail @submit.prevent="handleSubmit">
        <v-text-field
          v-model="id"
          :rules="idRules"
          label="아이디"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="pwRules"
          label="비밀번호"
          type="password"
          class="mb-7"
        ></v-text-field>
        <v-btn type="submit" block>LOGIN</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
import commonAxios from "@/utils/commonAxios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Cookies from "js-cookie";

const id = ref("");
const idRules = [
  (value) => {
    if (!value) {
      return "아이디를 입력해주세요.";
    }
    if (!/[a-zA-Z]/.test(value)) {
      return "아이디는 영어를 반드시 포함해야 합니다.";
    }
    if (/[^a-zA-Z0-9]/.test(value)) {
      return "아이디는 영어와 숫자만 사용할 수 있습니다.";
    }
    return true;
  },
];

const password = ref("");
const pwRules = [
  (value) => {
    if (!value) {
      return "비밀번호를 입력해주세요.";
    }
    return true;
  },
];

const router = useRouter();

const handleSubmit = () => {
  const requestBody = {
    id: id.value,
    password: password.value,
  };

  const idError = idRules
    .map((rule) => rule(id.value))
    .find((error) => error !== true);
  const pwError = pwRules
    .map((rule) => rule(password.value))
    .find((error) => error !== true);

  if (!idError && !pwError) {
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
  }
};
</script>
