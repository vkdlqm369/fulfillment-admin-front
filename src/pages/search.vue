<script setup>

import ResultTable from '../components/ResultTable.vue'
import TextBlank from "../components/TextBlank.vue";
import TextSelection from '../components/TextSelection.vue';
import SearchBtn from '../components/SearchBtn.vue';
import axios from 'axios'

  const tableItems = ref([
    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    },    {
      user_id : '더미 데이터',
      id : '더미 데이터',
      name : '더미 데이터',
      email : '더미 데이터',
      department : '더미 데이터',
      memo : '더미 데이터',
      registration_date : '더미 데이터',
      login_time : '더미 데이터',
      login_ip : '더미 데이터',
      is_used : '더미 데이터',
    }
])


const components = {
    ResultTable, 
    TextBlank,
    TextSelection,
    SearchBtn,
}

const headerss = [
  { title : '관리자번호', value: 'user_id'},
  { title : '아이디', value: 'id'},
  { title : '관리자명', value: 'name'},
  { title : '이메일', value: 'email'},
  { title : '부서', value: 'department'},
  { title : '메모', value: 'memo'},
  { title : '등록일', value: 'registration_date'},
  { title : '최종로그인', value: 'login_time'},
  { title : '최종로그인 IP', value: 'login_ip'},
  { title : '사용유무', value: 'is_used'}
]

const Input_Map_For_Search = ref({
  id : "",
  name : "",
  email : "",
  is_used : "",
  page : 1,
  show_list : '10',
}
)
const baseUrl = "http://localhost:8099/api"
const isSearch = ref(false)
const totalLists = ref(0)

const name = "app";
const numOfPage = ref(0)

function changeShowPage(){
  if(isSearch.value)
    SearchHandler()
}

function SearchHandler(){

axios.defaults.withCredentials = true;

console.log(Input_Map_For_Search.value.page)

// 구현중입니다

axios
  .post(baseUrl + '/say/hi', JSON.stringify(Input_Map_For_Search.value), {
    // withCredentials: true,
    Headers: {
      "Content-Type" : "multipart/form-data"
    }
  })
  .then((res)=>{
    totalLists.value = res.totalLists
    tableItems.value = res.data.users
    numOfPage.value = Math.ceil(totalLists.value / Input_Map_For_Search.value.show_list)
    console.log("성공", res)
  })
  .catch((res)=>{
    console.log("실패", res)
  })
     /*
    임시 데이터 
    */

  totalLists.value = 52
  numOfPage.value = Math.ceil(totalLists.value / Input_Map_For_Search.value.show_list)
  isSearch.value = true
}

</script>

<template>

 <v-container>
    <v-container>
      <v-row justify="start">
        <v-col cols="">
          <v-row>
            <v-col  cols="12" md="2" sm="6">
              <TextBlank v-model:inputText="Input_Map_For_Search.id" labelName="아이디"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextBlank v-model:inputText="Input_Map_For_Search.name" labelName="관리자명"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextBlank v-model:inputText="Input_Map_For_Search.email" labelName="이메일"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextSelection  v-model:selected="Input_Map_For_Search.is_used" labelName="사용유뮤" :itemList="[{name:'사용', value: 'true' },{name:'미사용', value: 'false' }]"
             />
            </v-col>
            <v-col cols="12" md="2"  sm="6" >
              <SearchBtn class="mt-2" @click="SearchHandler" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  
    <v-container>
      <v-row>
        <v-cols v-if="isSearch" cols="2" class="mt-8">
          <span style="color : red;">{{totalLists}}</span>
          <span>건 검색</span>
        </v-cols>
        <v-spacer></v-spacer>
        <v-cols cols="4" class="d-flex d-flex-inline ga-4">
            <v-btn class="mt-1" style="width:10px; height:50px;" @click="">등록</v-btn>
            <TextSelection v-model:selected="Input_Map_For_Search.show_list" 
            :itemList="[
              {name:'10개씩 보기', value : '10'}, {name:'20개씩 보기', value:'20'}, {name:'50개씩 보기', value:'50'}, {name:'100개씩 보기', value:'100'}]"
              @update:modelValue="changeShowPage"/>
        </v-cols>
    
      </v-row>
    </v-container>

  </v-container>

  <v-container v-if="isSearch">
    <ResultTable :tableItems="tableItems" :headers="headerss" />
  </v-container>
  <v-container v-if="isSearch">
      <v-pagination v-model="Input_Map_For_Search.page" :length="numOfPage" :total-visible="8" @click="SearchHandler" ></v-pagination>
  </v-container>
</template>