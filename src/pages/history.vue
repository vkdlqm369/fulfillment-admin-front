<script setup>

import TextBlank from "../components/TextBlank.vue";
import TextSelection from '../components/TextSelection.vue';
import SearchBtn from '../components/SearchBtn.vue';
import commonAxios from '@/utils/commonAxios';
import { watch } from "vue";
import { getHistory } from "@/utils/api";

const tableItems = ref([])

const headers = [
  { title : '로그인 일시', value: 'loginTime'},
  { title : '관리자명', value: 'name'},
  { title : '아이디', value: 'ID'},
  { title : '로그인 디바이스', value: 'loginDevice'},
  { title : '로그인 아이피', value: 'loginIp'}
]

const inputMapForSearch = ref({
  id : "",
  name : "",
  page : 1,
  showList : '10',
})

const isSearch = ref(false)
const totalLists = ref(0)
const name = "app";
const numOfPage = ref(0)
const loading = ref(false)

function SearchHandler(page=1){
  
  inputMapForSearch.value.page = page
  const path = ref('')
  const params = new URLSearchParams()

  for(let key in inputMapForSearch.value){
      params.append(key, inputMapForSearch.value[key])
  }
  loading.value = true
  getHistory(params, totalLists, tableItems, numOfPage);
  loading.value = false
  isSearch.value = true
}

</script>

<template>
  <v-container>
    <h1 style="margin:15px">관리자 접속 이력 조회</h1>
    <v-container class="search-container">
      <TextBlank
        v-model:inputText="inputMapForSearch.id"
        labelName="아이디"
        style="max-width: 200px"
        @keyup.enter="SearchHandler()"
      />

      <TextBlank
        v-model:inputText="inputMapForSearch.name"
        labelName="관리자명"
        style="max-width: 200px"
        @keyup.enter="SearchHandler()"
      />

      <SearchBtn class="fixed-h" @click="SearchHandler()" />
    </v-container>

    <v-container class="action-container">
      <v-container v-if="isSearch" class="min-w-max-c">
        <span style="color: red">{{ totalLists }}</span>
        <span>건 검색</span>
      </v-container>
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

.fixed-h {
  height: 55px;
}

.min-w-max-c {
  min-width: max-content;
}

.result-container {
  overflow-y: auto;
  max-height: 55vh; 
}

.pagination-container {
  overflow-y: auto;
  max-height: 20vh;
}
</style>
