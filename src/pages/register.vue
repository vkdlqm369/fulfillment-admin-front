<script setup>
import { ref } from "vue";
import commonAxios from "@/utils/commonAxios";
import {
  idRules,
  passwordRules,
  confirmPasswordRules,
  nameRules,
  emailRules,
  permissionRules,
  validateForm,
} from "@/utils/validationRules";
import CheckDialog from "@/components/CheckDialog.vue";
import ChooseDialog from "@/components/ChooseDialog.vue";
import { postRegister } from "@/utils/api";
import { search } from "@/";

const id = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const permission = ref("");
const name = ref("");
const department = ref("");
const memo = ref("");

const showPassword = ref(false);
const showPasswordCheck = ref(false);

const validationDialog = ref(false);
const backDialog = ref(false);
const message = ref("");

const items = [
  { title: "일반 관리자", value: "ADMIN" },
  { title: "통합 관리자", value: "MASTER" },
];

// 해당 함수는 필수값 입력 여부 검증
const handleSubmit = async () => {
  const fieldsWithRules = [
    { value: id.value, rules: idRules },
    { value: password.value, rules: passwordRules },
    {
      value: confirmPassword.value,
      rules: confirmPasswordRules(password.value),
    },
    { value: email.value, rules: emailRules },
  ];

  const validationMessage = validateForm(fieldsWithRules);
  if (validationMessage !== true) {
    message.value = validationMessage;
    validationDialog.value = true;
  } else {
    const requestBody = {
      id: id.value,
      password: password.value,
      name: name.value,
      email: email.value,
      permission: permission.value,
      department: department.value,
      memo: memo.value,
    };

    try {
      const response = await postRegister(requestBody);
    } catch {
      //error 처리
    }
  }
};
</script>

<template>
  <v-app>
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height">
        <v-col
          cols="12"
          md="8"
          lg="6"
          class="d-flex flex-column fill-height overflow-auto"
        >
          <v-toolbar flat>
            <v-toolbar-title>관리자 등록</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:append>
              <div class="ma-2">
                <v-btn color="blue" block @click="backDialog = true">
                  목록으로
                </v-btn>
              </div>
            </template>
          </v-toolbar>

          <v-card class="flex-grow-1 overflow-y-auto" style="height: 100vh">
            <v-card-text>
              <v-form
                fast-fail
                ref="form"
                class="form-style"
                @submit.prevent="handleSubmit"
              >
                <!-- 기본정보 섹션 -->
                <h3>기본정보</h3>
                <v-container fluid>
                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>아이디</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="예: test1234"
                        hint=" 3자리 이상의 영문 혹은 영문/숫자 조합"
                        persistent-hint
                        variant="outlined"
                        density="compact"
                        v-model="id"
                        :rules="idRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>비밀번호</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="비밀번호를 입력하세요"
                        hint="10자리 이상의 영소문자/숫자/특수문자 조합"
                        persistent-hint
                        variant="outlined"
                        density="compact"
                        :append-inner-icon="
                          showPassword ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="showPassword ? 'text' : 'password'"
                        @click:append-inner="showPassword = !showPassword"
                        v-model="password"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>비밀번호 확인</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="비밀번호를 한번 더 입력하세요"
                        variant="outlined"
                        density="compact"
                        persistent-hint
                        :append-inner-icon="
                          showPasswordCheck ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="showPasswordCheck ? 'text' : 'password'"
                        @click:append-inner="
                          showPasswordCheck = !showPasswordCheck
                        "
                        v-model="confirmPassword"
                        :rules="confirmPasswordRules(confirmPassword)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>관리자명</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="name"
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>이메일</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
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

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>권한</span>
                        <span class="text-info">(필수)</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-select
                        api
                        :items="items"
                        item-title="title"
                        item-value="value"
                        required
                        dense
                        variant="outlined"
                        density="compact"
                        hint="관리자 페이지 접근제한이 필요한 경우 관리자를 선택"
                        persistent-hint
                        v-model="permission"
                        :rules="permissionRules"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <!-- 추가정보 섹션 -->
                  <h3>추가정보</h3>
                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>부서</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="department"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>메모</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="memo"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- 등록 버튼 -->
                  <v-row>
                    <v-col cols="12">
                      <v-btn type="submit" color="primary" class="mt-4" block
                        >등록</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ChooseDialog
      v-model="backDialog"
      message="목록으로 이동하시겠습니까?"
      :to="'/search'"
    >
    </ChooseDialog>
    <CheckDialog :to="'/search'" v-model="validationDialog" :message="message"></CheckDialog>
  </v-app>
</template>

<style scoped>
/* 폼 요소 일렬로 정렬 */
.form-style {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
