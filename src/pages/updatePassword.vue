<template>
    <v-container>
      <v-card style="width: 400;" variant="outlined">
        <v-row align-center justify-center>
            <v-card-title>
            <h2>비밀번호 변경</h2>
            </v-card-title>
        </v-row>

        <v-card_text> 
          <v-form>
          <v-row>
            <v-col>
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
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row> 
          <v-col>
            <v-btn color="primary" class="mt-4" block @click = "submitForm">등록</v-btn>
          </v-col>
        </v-row>

        </v-form>
        </v-card_text>
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

  const checkPasswordRule = [
      value => value !== currentPassword.value || ' 현재와 다른 비밀번호를 입력해주세요.'
  ];

  const confirmPasswordRules = [
    value => value === newPassword.value || '동일한 비밀번호를 입력해주세요.'
  ]
  
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
  