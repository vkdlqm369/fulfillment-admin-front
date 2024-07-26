<script setup>
import TextBlank from "../components/TextBlank.vue";
import TextSelection from "../components/TextSelection.vue";
import SearchBtn from "../components/SearchBtn.vue";
import UserUpdateModal from "../components/UserUpdateModal.vue";
import CheckDialog from "../components/CheckDialog.vue";
import ChooseDialog from "@/components/ChooseDialog.vue";
import { getSearch, getAuthority, deleteUser, updateOtherUser, patchApprove } from "@/utils/api";
import { removeT } from "@/utils/TimeFormat"
import { onMounted, computed } from "vue";
import router from "@/router/index";


const tableItems = ref([]);

const headerProps = ref(
  {
    class: 'bg-black'
  }
)

const headers = [
  { title: "관리자번호", value: "userId", width: "100px", align: 'center', headerProps: headerProps},
  { title: "아이디", value: "id", width: "90px", headerProps: headerProps },
  { title: "관리자명", value: "name", width: "90px", headerProps: headerProps },
  { title: "이메일", value: "email", width: "120px", headerProps: headerProps },
  { title: "권한", value: "permission", width: "80px", headerProps: headerProps},
  { title: "부서", value: "department", width: "120px", headerProps: headerProps },
  { title: "메모", value: "memo", width: "120px", headerProps: headerProps },
  { title: "등록일", value: "registrationDate", width: "180px", headerProps: headerProps },
  { title: "최종로그인", value: "lastLoginTime", width: "180px", headerProps: headerProps },
  { title: "최종로그인 IP", value: "lastLoginIp", width: "120px", headerProps: headerProps },
  { title: "활성화유무", value: "isUsed", width: "100px", headerProps: headerProps },
  { title: "", value: "btn", width: "30px", headerProps: headerProps}
];

const inputMapForSearch = ref({
  id: "",
  name: "",
  email: "",
  isUsed: "",
  page: 1,
  showList: 10,
});

const isSearch = ref(false);
const totalLists = ref(0);
const numOfPage = ref(0);
const loading = ref(false);

// merge시 데이터 삭제
const authority = ref('');
const id = ref('');
const userInfo = ref({
         id: "jomg",
			   name:"김예린",
			   permission: "MASTER",
				 email: "niry929@naver.com",
				 department: "fulfillment",
				 memo: "hihi",
				 isUsed: true,
				 registrationDate: "2024-01-01 ...",
			   lastLoginTime: "2024-02-02 ....",			  
			   lastLoginIp: "dfdf"
})
// merge시 데이터 삭제

const selected = ref([]);

const deleteDialogs = ref([
  { delete: false },
  { deleteMe: false },
  { nonSelect: false },
  { deleteSuccess: false}
]);

const approveDialogs = ref([
  { approve: false },
  { alreadyApproved: false },
  { nonSelect: false },
]);

const updateDialogs = ref([
  { userUpdate: false },
  { updateSuccess: false},
])

function isMaster(){
  return (authority.value === 'MASTER')
}


async function loadUserInfo(item){

  if(id.value == item){
    router.push('/mypage')
  }
  else{
    try{
      // const response = await getMyInfo(item)
      // userInfo.value = response.data;
      updateDialogs.value['userUpdate'] = true;
    }
    catch{
    }
  }
}

async function searchHandler(page = 1) {
  isSearch.value = true;
  inputMapForSearch.value.page = page;
  tableItems.value = [];

  const params = new URLSearchParams();

  for (let key in inputMapForSearch.value) {
    params.append(key, inputMapForSearch.value[key]);
  }

  loading.value = true;

  try {
    const response = await getSearch(params);
    totalLists.value = response.data.totalLists;
    tableItems.value = response.data.users;
    numOfPage.value = response.data.totalPages;

    for (let user of tableItems.value) {
      user.isUsed = user.isUsed ? "활성화" : "비활성화";
      user.permission = (user.permission === "MASTER") ? "통합관리자" : "일반관리자"
      user.lastLoginTime = removeT(user.lastLoginTime);
      user.registrationDate = removeT(user.registrationDate);
    }
  } catch (error) {
    message.value = error.data.message;
    validationDialog.value = true;
  }

  loading.value = false;
  isSearch.value = true;
  selected.value = [];
}

// 삭제버튼
function checkDeleteMe() {
  return selected.value.indexOf(id.value) != -1;
}

function showDeleteDialog() {
  console.log("SDAfsdaf")
  if (selected.value.length == 0) deleteDialogs.value["nonSelect"] = true;
  else if (checkDeleteMe()) deleteDialogs.value["deleteMe"] = true;
  // else if (checkAlreadyApproved())
  //   deleteDialogs.value["alreadyApproved"] = true;
  else deleteDialogs.value["delete"] = true;
}

async function deleteHandler(){

 try {
    const response = await deleteUser({data:{ids:selected.value}});
    deleteDialogs.value['deleteSuccess'] = true
  } catch {
    //error 처리
  }
}

// 승인버튼
function checkAlreadyApproved() {
  return selected.value.some((id) => {
    const selectedItem = tableItems.value.find((item) => item.id === id);
    return selectedItem && selectedItem.isUsed === "활성화";
  });
}

function showApproveDialog() {
  if (selected.value.length == 0) approveDialogs.value["nonSelect"] = true;
  else if (checkAlreadyApproved())
    approveDialogs.value["alreadyApproved"] = true;
  else approveDialogs.value["approve"] = true;
}

async function approveHandler() {
  console.log(selected.value);
  try {
    const response = await patchApprove(selected.value);
    searchHandler();
  } catch {}
}

async function updateOthersHandler(){

  try{
    let req = {
      id: "",
			name:"",
			permission: "",
			email: "",
			department: "",
			memo: "",
    }
    req = userInfo.value;
    const response = await updateOtherUser(req);
    updateDialogs.value['updateSuccess']=true
  }
  catch{

  }

}

onMounted(async () => {
  try {
    const response = await getAuthority();
    authority.value = response.data.authority;
    id.value = response.data.id;
    console.log(response);
  } catch {}
});
</script>

<template>
  <v-container style="min-height: 100vh">
    <v-container>
      <h1 style="margin: 15px" class="content-container">관리자 조회</h1>
      <v-container class="search-container">
        <TextBlank
          v-model:inputText="inputMapForSearch.id"
          labelName="아이디"
          style="max-width: 120px"
          @keyup.enter="searchHandler()"
        />

      <TextBlank
        v-model:inputText="inputMapForSearch.name"
        labelName="관리자명"
        style="max-width: 140px"
        @keyup.enter="searchHandler()"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.email"
        labelName="이메일"
        style="max-width: 200px"
        @keyup.enter="searchHandler()"
      />

      <TextSelection
        v-model:selected="inputMapForSearch.isUsed"
        style="max-width: 140px"
        labelName="활성화유뮤"
        :itemList="[
          { name: '선택', value: '' },
          { name: '활성화', value: 'TRUE' },
          { name: '비활성화', value: 'FALSE' },
        ]"
      />
      <SearchBtn class="fixed-h bg-black" @click="searchHandler()" />
    </v-container>

    <v-container class="action-container">
      <v-container v-if="isSearch" class="min-w-max-c">
        <span style="color: red">{{ totalLists }}</span>
        <span>건 검색</span>
      </v-container>
      <v-btn 
        v-if="isMaster()"
        variant="elevated"
        color="#5A72A0"
        class="fixed-h rounded-lg" 
        to="/register">관리자 등록</v-btn>
        <v-btn
          v-if="isMaster()"
          variant="tonal"
          color="#6EACDE"
          class="fixed-h rounded-lg"
          style="font-weight: bold"
          @click="showApproveDialog"
          >승인</v-btn
        >
      <v-btn 
        v-if="isMaster()" 
        variant="tonal"
        class="fixed-h text-error rounded-lg" 
        style="font-weight:bold;"
        @click="showDeleteDialog">삭제</v-btn>

        <ChooseDialog
          v-model="deleteDialogs['delete']"
          :message="`총 ${selected.length}명의 관리자를 삭제 하시겠습니까?`"
          :handleClick="deleteHandler"
        />

        <CheckDialog
          v-model="deleteDialogs['deleteMe']"
          message="자신을 삭제할 수 없습니다."
        />

        <CheckDialog
          v-model="deleteDialogs['nonSelect']"
          message="1개 이상의 삭제할 계정을 골라주세요."
        />

        <ChooseDialog
          v-model="approveDialogs['approve']"
          :message="`총 ${selected.length}명의 관리자를 승인 하시겠습니까?`"
          :handleClick="approveHandler"
        />

        <CheckDialog
          v-model="approveDialogs['alreadyApproved']"
          message="이미 승인된 계정은 선택할 수 없습니다."
        />

        <CheckDialog
          v-model="approveDialogs['nonSelect']"
          message="1개 이상의 승인할 계정을 골라주세요."
        />

        <CheckDialog
          v-model="deleteDialogs['deleteSuccess']"
          message="삭제가 완료되었습니다."
          @close="searchHandler"
        />

      <TextSelection
        v-model:selected="inputMapForSearch.showList"
        :itemList="[
          { name: '10개씩 보기', value: 10 },
          { name: '20개씩 보기', value: 20 },
          { name: '50개씩 보기', value: 50 },
          { name: '100개씩 보기', value: 100 },
        ]"
        style="min-width: fit-content; max-width: fit-content"
        @update:modelValue="searchHandler()"
      />
    </v-container>
  </v-container>

  <v-container v-if="isSearch" class="content-container">
    <v-row>
      <v-col>
          <v-data-table-virtual
            v-model="selected"
            :items="tableItems"
            :headers="headers"
            :loading="loading"
            loading-text="Loading... Please wait"
            :show-select="isMaster()"
            height="60vh"
            fixed-header
            hover
            sticky
          >
        <template v-slot:item.btn="row">
          <v-btn v-if="isMaster()" color="green" @click="loadUserInfo(row.item.id)">
          수정
          </v-btn></template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pagination-container">
    <v-pagination
      v-if="!loading"
      v-model="inputMapForSearch.page"
      :length="numOfPage"
      :total-visible="8"
      @click="searchHandler(inputMapForSearch.page)"
    ></v-pagination>
      </v-col>
    </v-row>
  </v-container>

  <UserUpdateModal 
    v-model:dialog="updateDialogs['userUpdate']"
    v-model:userInfo="userInfo"
    :authority="authority"
    @updateOthers="updateOthersHandler"
  />

  <CheckDialog
    v-model="updateDialogs['updateSuccess']"
    message="수정이 완료되었습니다."
    @close="searchHandler"
  />

  </v-container>

</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: flex-start;
  gap: 25px;
}

.action-container {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.content-container {
  min-width: min-content;
  word-break: keep-all;
}

.fixed-h {
  height: 50px;
}

.min-w-max-c {
  min-width: max-content;
}

.result-container {
  overflow-y: auto;
  max-height: 60vh;
}

.pagination-container {
  overflow-y: auto;
  max-height: 20vh;
}

.selected-row {
  background-color: #e3f2fd !important; /* 선택된 행의 배경색 */
}
</style>
