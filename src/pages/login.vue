<script setup>
import { ref } from "vue";
import { postLogin } from "@/utils/api";
import router from "@/router";
import commonAxios from "@/utils/commonAxios";
import Cookies from "js-cookie";
import {
  idRules,
  passwordRulesWithoutNorm,
  validateForm,
} from "@/utils/validationRules";

const id = ref("");
const password = ref("");

const handleSubmit = async () => {
  const fieldsWithRules = [
    { value: id.value, rules: idRules },
    { value: password.value, rules: passwordRulesWithoutNorm },
  ];

  const message = validateForm(fieldsWithRules);
  if (message !== true) {
  } else {
    const requestBody = {
      id: id.value,
      password: password.value,
    };

    const response = await postLogin(requestBody);
    Cookies.set("accessToken", response.token);
    commonAxios.defaults.headers.common["Authorization"] = `${response.token}`;
    localStorage.setItem("authority", response.token);
    router.push("/search");
  }
};
</script>

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
          :rules="passwordRulesWithoutNorm"
          label="비밀번호"
          type="password"
          class="mb-7"
        ></v-text-field>
        <v-btn type="submit" block>LOGIN</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
