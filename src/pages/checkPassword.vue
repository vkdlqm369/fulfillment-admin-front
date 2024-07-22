<template>
    <v-container>
      <v-card style="width: 400;">
        <v-row align-center justify-center>
            <v-card-title>
            <h2>비밀번호 변경</h2>
            </v-card-title>
        </v-row>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="currentPassword"
              :type="showPassword ? 'text' : 'password'"
              label="현재비밀번호입력"
              variant="outlined"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
  
            <v-text-field
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              label="새 비밀번호 입력"
              variant="outlined"
              prepend-icon="mdi-lock"
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showNewPassword = !showNewPassword"
              hint="10~20자 이하, 영문자·숫자 조합, 특수문자 허용, 같은 문자·숫자 연속 3번이상 사용 불가"
              persistent-hint
              required
            ></v-text-field>
  
            <v-text-field
              v-model="confirmNewPassword"
              :type="showConfirmNewPassword ? 'text' : 'password'"
              label="새 비밀번호 확인"
              variant="outlined"
              prepend-icon="mdi-lock"
              :append-icon="showConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmNewPassword = !showConfirmNewPassword"
              hint="위의 비밀번호를 한번 더 입력해 주세요"
              persistent-hint
              required
            ></v-text-field>
  
            <v-btn color="primary" class="mt-4" block @click = "submitForm">등록</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmNewPassword = ref('');
  const showPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmNewPassword = ref(false);
  
//   const changePassword = () => {
//     if (newPassword.value !== confirmNewPassword.value) {
//       alert('새 비밀번호가 일치하지 않습니다.');
//       return;
//     }
//     // Proceed with password change
//     alert('비밀번호가 성공적으로 변경되었습니다.');
//   };
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
  