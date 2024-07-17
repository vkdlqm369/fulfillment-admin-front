
<template>
  <v-app>
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height" >
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height overflow-auto">
          <v-toolbar flat>
            <v-toolbar-title>관리자 등록</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:append>
            <div class="ma-2">
              <v-btn color = "blue" block @click="dialog = true"> 목록으로 </v-btn>
            </div>
          </template>
          <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card class="pa-2">
              <v-card-title>
                목록으로 이동하시겠습니까?
              </v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = true" to="/search">네</v-btn>
            <v-btn @click="dialog = false">아니오</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

          </v-toolbar>

          <v-card 
          class="flex-grow-1 overflow-y-auto" style="height: 100vh;">
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent >
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
                      <v-text-field label="비밀번호를 입력하세요" 
                      hint="10자리 이상의 영소문자/숫자/특수문자 조합" 
                      persistent-hint 
                      variant="outlined" 
                      density="compact"
                      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append-inner="show1 = !show1"
                      v-model="password" 
                      :rules="passwordRules" ></v-text-field>
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
                      :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      @click:append-inner="show2 = !show2"
                      v-model="confirmPassword" 
                      :rules="confirmPasswordRules" ></v-text-field>
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
                      <v-select api
                      :items="items"
                      item-title="title"
                      item-value="value"
                      required dense
                      variant="outlined" 
                      density="compact" 
                      hint="관리자 페이지 접근제한이 필요한 경우 관리자를 선택" 
                      persistent-hint
                      v-model = "permission"
                      :rules="permissionRules"></v-select>
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
                      v-model = "department"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row  class="py-2">
                    <v-col cols="4">
                      <v-list-subheader>메모</v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field 
                      variant="outlined" 
                      density="compact" 
                      v-model = "memo"></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- 등록 버튼 -->
                  <v-row>
                    <v-col cols="12">
                      <v-btn color="primary" class="mt-4" block @click = "submitForm">등록</v-btn>

                          <v-dialog v-model="dialog2" max-width="400" persistent>
                            <v-card class="pa-2">
                              <v-card-title>
                                <v-icon color="error" icon="mdi-alert-circle"></v-icon>
                                채우지 않은 필수값이 있습니다.
                              </v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog2 = false">확인</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="dialog3" max-width="450" persistent>
                            <v-card class="pa-2">
                              <v-card-title>
                                <v-icon color="error" icon="mdi-alert-circle"></v-icon>
                                필수값 조건을 다시 확인해주십시오
                              </v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog3 = false">확인</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
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




<script setup>

import { ref } from 'vue';

import commonAxios from '@/utils/commonAxios';

const id = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const permission = ref('');
const name = ref('');
const department = ref('');
const memo = ref('');
const show1 = ref(false);
const show2 = ref(false);
const dialog = ref(false); //기본 상태 false, true면 열린 상태가 초기 화면
const dialog2 = ref(false);
const dialog3 = ref(false);
const items = [
  { title: '관리자', value: 'ADMIN' },
  { title: '마스터', value: 'MASTER' }
];

const idRules = [
  value => !!value || '아이디는 필수값입니다.',
  value => /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,60}$/.test(value) || '아이디는 3자리 이상의 영문 혹은 영문/숫자를 입력해주세요.'
];

const passwordRules = [
  value => !!value || '비밀번호는 필수값입니다.',
  value => /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{10,100}$/.test(value) || '비밀번호는 10자리 이상의 소문자/숫자/특수문자를 입력해주세요.'
];

const confirmPasswordRules = [
  value => !!value || '비밀번호 확인이 필요합니다',
  value => value === password.value || '동일한 비밀번호를 입력해주세요.'
];

const nameRules = [
  value => !!value || '관리자명은 필수값입니다.'
]

const emailRules = [
  value => !!value || '이메일은 필수값입니다.',
  value => /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[A-Za-z0-9])*.[a-zA-Z]{2,3}$/.test(value) || '이메일 형식에 맞게 작성해주십시오'
];

const permissionRules = [
  value => !!value || '권한 선택은 필수값입니다.',
]


// 해당 함수는 필수값 입력 여부 검증
const enteredForm = () => {
  return (
    !!id.value &&
    !!password.value &&
    !!confirmPassword.value &&
    !!name.value &&
    !!email.value &&
    !!permission.value
  );
};

//해당 함수는 필수값 유효 여부 검증
const validateForm = () => {
  // 아이디 유효성 검증
  for (let rule of idRules) {
    if (rule(id.value) !== true) {
      return false;
    }
  }

  // 비밀번호 유효성 검증
  for (let rule of passwordRules) {
    if (rule(password.value) !== true) {
      return false;
    }
  }

  // 비밀번호 확인 유효성 검증
  for (let rule of confirmPasswordRules) {
    if (rule(confirmPassword.value) !== true) {
      return false;
    }
  }

  // 이메일 유효성 검증
  for (let rule of emailRules) {
    if (rule(email.value) !== true) {
      return false;
    }
  }

  return true;
};


const submitForm = () => {
  if (!enteredForm()) {
    dialog2.value = true;
  }else if (!validateForm()) {
    dialog3.value = true;
  }else {
    // 폼 제출 처리 로직 (예: 서버에 데이터 전송)
    console.log('Form Submitted');
  }
};

const handleSubmit = () => {
  const requestBody = {
    id: id.value,
    pw: password.value,
    adminName: name.value,
    email: email.value,
    permission: permission.value,
    department: department.value,
    memo: memo.value
    
  };

if(!validateForm && !submitForm) {
  commonAxios
  .post("/register", requestBody)
  .then((res) => {
  if(res.status === 200) {
    console.log("관리자 등록 성공")
  }else if(res.status === 400) {
    alert("관리자 등록 실패")
  } else if(res.status === 500) {
    console.log("서버 내부 오류입니다")
  }
  })

  }
}



</script>

<style scoped>
/* 폼 요소 일렬로 정렬 */
.v-form {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

</style>





  
