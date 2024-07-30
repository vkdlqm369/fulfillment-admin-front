<script setup>
  import { updatePassword } from '@/utils/api';
  import { ref } from 'vue';
  import Cookies from "js-cookie";
  import router from "@/router";
  import commonAxios from "@/utils/commonAxios";
  import { passwordRules, validateForm } from '@/utils/validationRules';
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmNewPassword = ref('');
  const showPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmNewPassword = ref(false);
  const updateDialog = ref(false);
  const updateFailDialog = ref(false);
  const validationDialog = ref(false);
  const message = ref('');

  const checkPasswordRule = [
    value => !!value || "비밀번호는 필수값입니다.",
    value =>
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{10,100}$/.test(
      value
    ) || "비밀번호는 10자리 이상의 소문자/숫자/특수문자를 입력해주세요.",
      value => value !== currentPassword.value || ' 현재와 다른 비밀번호를 입력해주세요.'
  ];

  const confirmPasswordRules = [
    value => value === newPassword.value || '동일한 비밀번호를 입력해주세요.'
  ]
  

  const submitForm = async() => {
    const fieldsWithRules = [
    { value: newPassword.value, rules: checkPasswordRule},
    { value: confirmNewPassword.value, rules: confirmPasswordRules}
  ];
  const validationMessage = validateForm(fieldsWithRules);

  if (validationMessage !== true) {
      message.value = validationMessage
      validationDialog.value = true;
  }
  else{
    const requestBody = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    }

      try {
      const response = await updatePassword(requestBody);
      console.log("업데이트 성공")
      updateDialog.value = true;
    } catch(error) {
      message.value = error.data.message;
      validationDialog.value = true;
    }
  }
  }

  const handleDialogClose = async() => {
    if(submitForm) {
      Cookies.remove("accessToken");
      delete commonAxios.defaults.headers.common.Authorization;
      await router.push("/login");
    }

  }

  </script>
  
  <style scoped>
  .v-container {
    max-width: 500px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .v-card {
    padding: 20px;
  }
  </style>
  
  
<template>
  <v-app max-width="100">
    <v-container>
      <v-card  class="flex-grow-1 overflow-y-auto" style="height: 60vh;"  >
        <v-row align-center justify-center>
            <v-card-title>
            <h2>비밀번호 변경</h2>
            </v-card-title>
        </v-row>

        <v-card_text> 
          <v-form>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-text-field
                  v-model="currentPassword"
                  :type="showPassword ? 'text' : 'password'"
                  label="현재 비밀번호 입력"
                  variant="outlined"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="py-2">
                <v-col>
                  <v-text-field
                  :type="showNewPassword ? 'text' : 'password'"
                  label="새 비밀번호 입력"
                  variant="outlined"
                  prepend-icon="mdi-lock"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showNewPassword = !showNewPassword"
                  hint="10~100자, 영소문자, 숫자, 특수문자 조합입니다."
                  persistent-hint
                  required
                  v-model="newPassword"
                  :rules="checkPasswordRule"
                ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="py-2">
              <v-col> 
                <v-text-field
                  :type="showConfirmNewPassword ? 'text' : 'password'"
                  label="새 비밀번호 확인"
                  variant="outlined"
                  prepend-icon="mdi-lock"
                  :append-icon="showConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showConfirmNewPassword = !showConfirmNewPassword"
                  hint="위의 비밀번호를 한번 더 입력해 주세요"
                  persistent-hint
                  required
                  v-model="confirmNewPassword"
                  :rules="confirmPasswordRules"
                 @keyup.enter="submitForm"

                ></v-text-field>
              </v-col>
            </v-row>

          <v-row> 
            <v-col>
              <v-btn color="primary" class="mt-4" block @click = "submitForm">등록</v-btn>
            </v-col>
          </v-row>
      </v-container>
        </v-form>
        </v-card_text>
      </v-card>

      <CheckDialog 
        v-model="updateDialog" 
        message="
        비밀번호 변경이 완료되었습니다
        로그인 페이지로 이동합니다."
        @close="handleDialogClose"
        icon="mdi-check-bold"
      ></CheckDialog>

      <CheckDialog v-model="validationDialog" :message="message" />
    </v-container>
  </v-app>
  </template>
  

  