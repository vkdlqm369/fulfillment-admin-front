<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  id: String,
  user: Object,
  modelValue: Boolean
});

// Define emits
const emit = defineEmits(['update:modelValue']);

// Local state for password input
const password = ref('');

// Method to close the dialog
const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog v-model="modelValue" max-width="500">
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height overflow-auto">
          <v-card>
            <v-card-title>비밀번호 확인</v-card-title>
            <v-card-text>
              - 개인정보 보호를 위해 비밀번호를 확인합니다<br>
              - 아래 입력창에 비밀번호를 입력하면 개인정보 수정 페이지로 넘어갑니다.
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card>
          <v-divider></v-divider>
          <v-card style="height: 35vh;">
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader>
                      <span>아이디</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ id }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader>
                      <span>비밀번호</span>
                    </v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field 
                      variant="outlined" 
                      density="compact" 
                      width="50vh"
                      v-model="password"
                      type="password"
                      placeholder="비밀번호 입력">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-btn to="/updateProfile" color="primary" class="mt-2" block size="large">확인</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
