<<<<<<< HEAD
=======
<script setup>
import { getMyInfo, updateProfile, getAuthority } from '@/utils/api';
import { convertAuthority, convertIsUsed, convertTime } from '@/utils/convertFormat';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Merry20033!

const user = ref({});
const id = ref("");

const updateInfoDialog = ref(false);
const validationDialog = ref(false)
const message = ref('')

const router = useRouter();

const fetchUser = async (id) => {
  try {
    const response = await getMyInfo(id);
    user.value = response.data
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }
};

onMounted(async () => {
    const response = await getAuthority();
    id.value = response.data.id;
  if (id.value) {
    fetchUser(id.value);
  }
});

const submitForm = async() => {

  let requestBody = {
      name: "",
      email: "",
      department: "",
      memo: ""
    }
  requestBody = user.value

    try {
        const response = await updateProfile(requestBody);
        console.log("업데이트 성공")
        updateInfoDialog.value = true;
    } catch(error) {
        console.log(error)
        message.value = error.data.message;
        validationDialog.value = true;
    }
}


</script>

>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                      <div>{{ id }}</div>
=======
                      <div>{{ user.id }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                        v-model="name"
=======
                        v-model="user.name"
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                      v-model="email" 
=======
                      v-model="user.email" 
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                      <div>{{ permission }}</div>
=======
                      <div>{{ convertAuthority(user.authority) }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                      v-model = "department"></v-text-field>
=======
                      v-model = "user.department"></v-text-field>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
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
<<<<<<< HEAD
                      v-model = "memo"></v-text-field>
=======
                      v-model = "user.memo"></v-text-field>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>사용여부</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
<<<<<<< HEAD
                      <div>{{ isUsed }}</div>
=======
                      <div>{{ convertIsUsed(user.isUsed) }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>등록일</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
<<<<<<< HEAD
                      <div>{{ registrationDate }}</div>
=======
                      <div>{{ convertTime(user.registrationDate) }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 시간</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
<<<<<<< HEAD
                      <div>{{ lastLoginTime }}</div>
=======
                      <div>{{ convertTime(user.lastLoginTime) }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 IP</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
<<<<<<< HEAD
                      <div>{{ lastLoginIp }}</div>
=======
                      <div>{{ user.lastLoginIp }}</div>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>
                </v-container>
                <v-row justify="center">
                    <v-col cols="8">
<<<<<<< HEAD
                      <v-btn color="primary" class="mt-2" block size="large">확인</v-btn>
=======
                      <v-btn @click="submitForm" color="primary" class="mt-2" block size="large">확인</v-btn>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
                    </v-col>
                  </v-row>
            </v-card-text>
          </v-card>
 
        </v-col>
      </v-row>
<<<<<<< HEAD
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
=======
      <CheckDialog 
        v-model="updateInfoDialog" 
        message="
        회원 정보 변경이 완료되었습니다
        마이 페이지로 이동합니다."
        :to="'/mypage/:id'"
        icon="mdi-check-bold"
      ></CheckDialog>

        <CheckDialog
            v-model="validationDialog"
            :message="message"
        />
    </v-container>
  </v-app>
</template>
>>>>>>> 52a463c84727c554c514cd50459764b9cca51c9d
