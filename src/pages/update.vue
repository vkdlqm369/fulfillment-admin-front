
<template>
  <v-app>
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height" >
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height overflow-auto">
          <v-toolbar flat>
            <v-toolbar-title>회원 정보 수정</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card 
          class="flex-grow-1 overflow-y-auto" style="height: 100vh;">
            <v-card-text>
                <!-- 회원 정보 섹션 -->
                <h3>회원정보</h3>
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
                        <span>관리자명</span>
                      </v-list-subheader>
                    </v-col>

                    <v-col cols="8">
                      <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>이메일</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field 
                      label="예: test1234@test.co.kr" 
                      variant="outlined" 
                      density="compact"
                      v-model="email" 
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>권한</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ permission }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>부서</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field 
                      variant="outlined" 
                      density="compact" 
                      v-model = "department"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>메모</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field 
                      variant="outlined" 
                      density="compact" 
                      v-model = "memo"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>사용여부</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ isUsed }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>등록일</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ registrationDate }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 시간</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ lastLoginTime }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 IP</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ lastLoginIp }}</div>
                    </v-col>
                  </v-row>
                </v-container>
                <v-row justify="center">
                    <v-col cols="8">
                      <v-btn color="primary" class="mt-2" block size="large">확인</v-btn>
                    </v-col>
                  </v-row>
            </v-card-text>
          </v-card>
 
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  
  <script setup>

  const id = ref("user123");  // Placeholder
  const name = ref("홍길동");  // Placeholder
  const email = ref("example@123.com");  // Placeholder
  const permission = ref("마스터");  // Placeholder
  const registrationDate = ref("2024.11.11");  // Placeholder
  const department = ref("플랫폼 개발팀");  // Placeholder
  const memo = ref("안녕하세요");  // Placeholder
  const isUsed = ref("Used");  // Placeholder
  const lastLoginTime = ref("Wed, 17 Jul 2024 15:00:00");  // Placeholder
  const lastLoginIp = ref("192.168.0.1");  // Placeholder
</script>