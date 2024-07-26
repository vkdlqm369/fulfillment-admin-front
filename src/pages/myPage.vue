<script setup>
import { getMyInfo } from '@/utils/api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CheckPasswordDialog from '@/components/CheckPasswordDialog.vue';

const user = ref({});
const checkOpen = ref(false);
const id = ref('jomg'); // 샘플
const path1 = ref(true)

const router = useRouter();

const fetchUser = async (id) => {
  try {
    user.value = await getMyInfo(id);
    console.log(user.value);
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 에러 발생");
  }
};

onMounted(() => {
  console.log(id); // Log to verify
  if (id.value) {
    fetchUser(id.value);
  }
});



const handlePasswordVerified = ( ) => {
  if(path1.value) {
    router.push('/updateProfile');
  }else{
    router.push('/updatePassword' );
    console.log("dd")
  }
  
};
</script>

<template>
  <v-app>
    <v-container fluid class="fill-height py-0">
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column fill-height overflow-auto">
          <v-toolbar flat>
            <v-toolbar-title>My Page</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card class="flex-grow-1 overflow-y-auto" style="height: 100vh;">
            <v-card-text>
              <h3>회원정보</h3>
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader><span>아이디</span></v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.id }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-list-subheader><span>관리자명</span></v-list-subheader>
                  </v-col>
                  <v-col cols="8">
                    <div>{{ user.name }}</div>
                  </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>이메일</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.email }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>권한</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.permission }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>부서</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.department }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>메모</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.memo }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>사용여부</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.isUsed }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>등록일</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.registrationDate }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 시간</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.lastLoginTime }}</div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-list-subheader>
                        <span>최종 로그인 IP</span>
                      </v-list-subheader>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ user.lastLoginIp }}</div>
                    </v-col>
                  </v-row>
              </v-container>

              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn @click="checkOpen=true; path1=true;" color="#546E7A" class="mt-2">회원 정보 수정</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="checkOpen=true; path1=false; console.log(path1)" color="#6D4C41" class="mt-2">비밀번호 수정</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <CheckPasswordDialog :id="id" v-model="checkOpen" @password-verified="handlePasswordVerified"></CheckPasswordDialog>
    </v-container>
  </v-app>
</template>


<style scoped>
.white--text {
  color: white !important;
}
</style>


  