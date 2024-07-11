<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-toolbar flat>
            <v-toolbar-title>관리자 등록</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="blue" text>목록으로</v-btn>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent>
                <!-- 기본정보 섹션 -->
                <h3>기본정보</h3>
                <v-container fluid>
                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>아이디(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="예: test1234"
                        hint="최소 3자리 이상의 영문 혹은 영문과 숫자를 조합"
                        persistent-hint
                        variant="outlined"
                        density="compact"
                        v-model="id"
                        :rules="idRules"
                      ></v-text-field>
                      <!-- style="min-width: 330px;" 창 크기 조절시 일정 크기까지는 유지되게 -->
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>비밀번호(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="비밀번호를 입력하세요"
                        hint="10자리 이상의 영소문자/숫자/특수문자 조합"
                        persistent-hint
                        variant="outlined"
                        density="compact"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        v-model="password"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>비밀번호 확인(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="비밀번호를 한번 더 입력하세요"
                        variant="outlined"
                        density="compact"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        v-model="confirmPassword"
                        :rules="confirmPasswordRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>관리자명(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        hint="관리자 페이지 접근제한이 필요한 경우 관리자를 선택"
                        persistent-hint
                        density="compact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>이메일(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="예: test1234@test.co.kr"
                        variant="outlined"
                        density="compact"
                        v-model="email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>권한(필수)</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-select
                        :items="['마스터', '관리자']"
                        required
                        dense
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <!-- 추가정보 섹션 -->
                  <h3>추가정보</h3>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>부서</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="my-auto">
                    <v-col cols="4">
                      <v-list-subheader>메모</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- 등록 버튼 -->
                  <v-row>
                    <v-col cols="12">
                      <v-btn color="primary" class="mt-4" block>등록</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import commonAxios from "@/utils/commonAxios";
import { id } from "vuetify/locale";

export default {
  name: "Register",

  data: () => ({
    id: "",
    idRules: [
      (value) =>
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,60}$/.test(value) ||
        "아이디는 3자리 이상의 영문 혹은 영문과 숫자를 조합해야 합니다.",
    ],

    password: "",
    confirmPassword: "",
    passwordRules: [
      (value) =>
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{10,100}$/.test(
          value
        ) || "비밀번호는 10자리 이상의 소문자/숫자/특수문자를 조합해야 합니다.",
    ],
    confirmPasswordRules: [
      // value => value === || '비밀번호를 위와 동일하게 작성해주세요. '
    ],

    email: "",
    emailRules: [
      (value) =>
        /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[A-Za-z0-9])*.[a-zA-Z]{2,3}$/.test(
          value
        ) || "이메일 형식에 맞게 작성해주십시오",
    ],

    return: {
      show1: false,
      show2: true,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
      },
    },
  }),
};
</script>

<style scoped>
/* 추가적인 스타일을 적용하여 폼 요소들을 일렬로 정렬합니다 */
.v-form {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
