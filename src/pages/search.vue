<script setup>
import TextBlank from "../components/TextBlank.vue";
import TextSelection from "../components/TextSelection.vue";
import SearchBtn from "../components/SearchBtn.vue";
import { getSearch, getAuthority } from "@/utils/api";
import { onMounted } from "vue";
import { computed } from "vue";

const tableItems = ref([]);

const headers = [
  { title: "관리자번호", value: "userId" },
  { title: "아이디", value: "id" },
  { title: "관리자명", value: "name" },
  { title: "이메일", value: "email" },
  { title: "부서", value: "department" },
  { title: "메모", value: "memo" },
  { title: "등록일", value: "registrationDate" },
  { title: "최종로그인", value: "lastLoginIp" },
  { title: "최종로그인 IP", value: "lastLoginIp" },
  { title: "사용유무", value: "isUsed" },
];

const inputMapForSearch = ref({
  id: "",
  name: "",
  email: "",
  isUsed: "",
  page: 1,
  showList: "10",
});

const isSearch = ref(false);
const totalLists = ref(0);
const numOfPage = ref(0);
const loading = ref(false);
const authority = ref("");
const userId = ref("");

const SearchHandler = async (page = 1) => {
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
    loading.value = false;
    totalLists.value = response.totalLists;
    tableItems.value = response.users;
    numOfPage.value = response.totalPages;
  } catch {
    //error 처리
  }
};

onMounted(() => {
  authority.value = "MASTER";
  // const response = getAuthority();
  // authority.value = response.authority;
  // userId.value = response.userId;
  // console.log(response);
});
</script>

<template>
  <v-container>
    <h1 style="margin: 15px" class="content-container">관리자 조회</h1>
    <v-container class="search-container">
      <TextBlank
        v-model:inputText="inputMapForSearch.id"
        labelName="아이디"
        style="max-width: 120px"
        @keyup.enter="SearchHandler()"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.name"
        labelName="관리자명"
        style="max-width: 140px"
        @keyup.enter="SearchHandler()"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.email"
        labelName="이메일"
        style="max-width: 200px"
        @keyup.enter="SearchHandler()"
      />

      <TextSelection
        v-model:selected="inputMapForSearch.isUsed"
        style="max-width: fit-content"
        labelName="사용유뮤"
        :itemList="[
          { name: '선택', value: '' },
          { name: '사용', value: 'TRUE' },
          { name: '미사용', value: 'FALSE' },
        ]"
      />
      <SearchBtn class="fixed-h" @click="SearchHandler()" />
    </v-container>

    <v-container class="action-container">
      <v-container v-if="isSearch" class="min-w-max-c">
        <span style="color: red">{{ totalLists }}</span>
        <span>건 검색</span>
      </v-container>
      <v-btn
        v-if="authority === 'MASTER'"
        color="info"
        class="fixed-h"
        to="/register"
        >등록</v-btn
      >
      <TextSelection
        v-model:selected="inputMapForSearch.showList"
        :itemList="[
          { name: '10개씩 보기', value: '10' },
          { name: '20개씩 보기', value: '20' },
          { name: '50개씩 보기', value: '50' },
          { name: '100개씩 보기', value: '100' },
        ]"
        style="max-width: fit-content"
        @update:modelValue="SearchHandler()"
      />
    </v-container>
  </v-container>

  <v-container v-if="isSearch" class="content-container">
    <v-row>
      <v-col class="result-container">
        <v-data-table-virtual
          :items="tableItems"
          :headers="headers"
          :loading="loading"
          loading-text="Loading... Please wait"
        ></v-data-table-virtual>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pagination-container">
        <v-pagination
          v-if="!loading"
          v-model="inputMapForSearch.page"
          :length="numOfPage"
          :total-visible="8"
          @click="SearchHandler(inputMapForSearch.page)"
        ></v-pagination>
      </v-col>
    </v-row>
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
  height: 55px;
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
</style>
