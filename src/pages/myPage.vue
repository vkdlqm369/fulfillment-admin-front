<template>
    <v-container class="pa-4 d-flex fill-height align-center justify-center">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" md="8">
          <v-card class="pa-4" outlined style="background-color: #616161;">
            <v-card-title>
              <h1 class="text-center">상세정보</h1>
            </v-card-title>
            
            <v-card-text class="pa-4 mt-4" style="background-color: black;">
              <v-row>
                <v-col cols="12">
                  <h2>{{ name }}님, 안녕하세요.</h2>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row :gap="1">
                <v-col cols="6">
                  <div>아이디: {{ id }}</div>
                  <div>관리자명: {{ name }}</div>
                  <div>이메일: {{ email }}</div>
                  <div>권한: {{ permission }}</div>
                  <div>등록일: {{ registrationDate }}</div>
                </v-col>
                <v-col cols="6">
                  <div>부서: {{ department }}</div>
                  <div>메모: {{ memo }}</div>
                  <div>사용여부: {{ isUsed }}</div>
                  <div>최종 로그인 시간: {{ lastLoginTime }}</div>
                  <div>최종 로그인 IP: {{ lastLoginIp }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
  
          <v-row class="mt-4" justify="center">
            <v-col cols="auto">
              <v-btn color="error" dark size="x-large">회원 정보 수정</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="error" dark size="x-large">비밀번호 수정</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const id = ref("user123");  // Placeholder
  const name = ref("홍길동");  // Placeholder
  const email = ref("example@123.com");  // Placeholder
  const permission = ref("마스터");  // Placeholder
  const registrationDate = ref("2024.11.11");  // Placeholder
  const department = ref("플랫폼 개발팀");  // Placeholder
  const memo = ref("메모장");  // Placeholder
  const isUsed = ref("Used");  // Placeholder
  const lastLoginTime = ref("Wed, 17 Jul 2024 15:00:00");  // Placeholder
  const lastLoginIp = ref("192.168.0.1");  // Placeholder
  </script>
  
  <style scoped>
  .white--text {
    color: white !important;
  }
  </style>
  