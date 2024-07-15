<script setup>
import ResultTable from "../components/ResultTable.vue";
import TextBlank from "../components/TextBlank.vue";
import TextSelection from "../components/TextSelection.vue";
import SearchBtn from "../components/SearchBtn.vue";
import commonAxios from "@/utils/commonAxios";

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
const dirty = ref(false);

function changeShowPage() {
  if (isSearch.value) {
    inputMapForSearch.value.page = 1;
    SearchHandler();
  }
}

function SearchHandler() {
  const path = ref("");
  const params = new URLSearchParams();

  if (dirty.value) {
    dirty.value = false;
    inputMapForSearch.value.page = 1;
  }

  for (let key in inputMapForSearch.value) {
    params.append(key, inputMapForSearch.value[key]);
  }

  commonAxios
    .get("/search?" + params.toString())
    .then((res) => {
      totalLists.value = res.data.totalLists;
      tableItems.value = res.data.users;
      numOfPage.value = Math.ceil(
        totalLists.value / inputMapForSearch.value.showList
      );
      console.log("성공", res);
    })
    .catch((res) => {
      console.log("실패", res);
    });

  isSearch.value = true;
}
</script>

<template>
  <v-container>
    <v-container class="search-container">
      <TextBlank
        v-model:inputText="inputMapForSearch.id"
        labelName="아이디"
        style="max-width: 120px"
        @change="dirty = true"
        @keyup.enter="SearchHandler"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.name"
        labelName="관리자명"
        style="max-width: 140px"
        @change="dirty = true"
        @keyup.enter="SearchHandler"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.email"
        labelName="이메일"
        style="max-width: 200px"
        @change="dirty = true"
        @keyup.enter="SearchHandler"
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
        @update:modelValue="dirty = true"
      />
      <SearchBtn class="fixed-h" @click="SearchHandler" />
    </v-container>

    <v-container class="action-container">
      <v-container v-if="isSearch" class="min-w-max-c">
        <span style="color: red">{{ totalLists }}</span>
        <span>건 검색</span>
      </v-container>
      <v-btn color="info" class="fixed-h" to="/register">등록</v-btn>
      <TextSelection
        v-model:selected="inputMapForSearch.showList"
        :itemList="[
          { name: '10개씩 보기', value: '10' },
          { name: '20개씩 보기', value: '20' },
          { name: '50개씩 보기', value: '50' },
          { name: '100개씩 보기', value: '100' },
        ]"
        style="max-width: fit-content"
        @update:modelValue="changeShowPage"
        @change="dirty = true"
      />
    </v-container>
  </v-container>

  <v-container v-if="isSearch" class="min-w-max-c">
    <ResultTable :tableItems="tableItems" :headers="headers" />
  </v-container>
  <v-container v-if="isSearch">
    <v-pagination
      v-model="inputMapForSearch.page"
      :length="numOfPage"
      :total-visible="8"
      @click="SearchHandler"
    ></v-pagination>
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

.fixed-h {
  height: 55px;
}

.min-w-max-c {
  min-width: max-content;
}
</style>
