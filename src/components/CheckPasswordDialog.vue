<script setup>
import { ref, watch } from 'vue';
import { checkPassword } from '@/utils/api';

const props = defineProps(['id', 'modelValue']);
const emit = defineEmits(['update:modelValue', 'password-verified']);
const password = ref('');
const passwordShow = ref(false);

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    open.value = true;
  } else {
    open.value = false;
  }
});

const open = ref(false);

const handleSubmit = async () => {
  const requestBody = {
    password: password.value
  };

  try {
    const response = await checkPassword(requestBody);
    if (response) {
      emit('password-verified');
  emit('update:modelValue', false);

    } else {
      console.log("비밀번호 검증에 실패했습니다.");

    }
  } catch {
    console.log("비밀번호 검증에 실패했습니다.");
  }
};
</script>

<template>
  <v-dialog v-model="open" persistent>
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height overflow-auto">
          <v-card>
            <v-card-title>비밀번호 확인</v-card-title>
            <v-card-text>
              - 개인정보 보호를 위해 비밀번호를 확인합니다<br>
              - 아래 입력창에 비밀번호를 입력하면 수정 페이지로 넘어갑니다.
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card>
          <v-divider></v-divider>
          <v-card style="height: 35vh;">
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader><span>아이디</span></v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ id }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader><span>비밀번호</span></v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field 
                      variant="outlined" 
                      density="compact" 
                      width="50vh"
                      v-model="password"
                      :type="passwordShow ? 'text' : 'password'"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-btn @click="handleSubmit" color="primary" class="mt-2" block size="large">확인</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
