<script setup>

import ResultTable from '../components/ResultTable.vue'
import TextBlank from "../components/TextBlank.vue";
import TextSelection from '../components/TextSelection.vue';
import SearchBtn from '../components/SearchBtn.vue';
import commonAxios from '@/utils/commonAxios';

  const tableItems = ref([])


const components = {
    ResultTable, 
    TextBlank,
    TextSelection,
    SearchBtn,
}

const headerss = [
  { title : '관리자번호', value: 'userId'},
  { title : '아이디', value: 'id'},
  { title : '관리자명', value: 'name'},
  { title : '이메일', value: 'email'},
  { title : '부서', value: 'department'},
  { title : '메모', value: 'memo'},
  { title : '등록일', value: 'registrationDate'},
  { title : '최종로그인', value: 'lastLoginIp'},
  { title : '최종로그인 IP', value: 'lastLoginIp'},
  { title : '사용유무', value: 'isUsed'}
]

const Input_Map_For_Search = ref({
  id : "",
  name : "",
  email : "",
  isUsed : "",
  page : 1,
  showList : '10',
})

const isSearch = ref(false)
const totalLists = ref(0)
const name = "app";
const numOfPage = ref(0)

function changeShowPage(){
  if(isSearch.value){
    Input_Map_For_Search.value.page = 1
    SearchHandler()
  }

}

function SearchHandler(){

const path = ref('')
const params = new URLSearchParams()

for(let key in Input_Map_For_Search.value){
    params.append(key, Input_Map_For_Search.value[key])
}

console.log('/search?' + params.toString())


commonAxios
  .get('/search?' + params.toString())
  .then((res)=>{
    totalLists.value = res.data.totalLists
    tableItems.value = res.data.users
    numOfPage.value = Math.ceil(totalLists.value / Input_Map_For_Search.value.showList)
    console.log("성공", res)
  })
  .catch((res)=>{
    console.log("실패", res)
  })

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
              <TextBlank v-model:inputText="Input_Map_For_Search.id" labelName="아이디" @keyup.enter="SearchHandler"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextBlank v-model:inputText="Input_Map_For_Search.name" labelName="관리자명" @keyup.enter="SearchHandler"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextBlank v-model:inputText="Input_Map_For_Search.email" labelName="이메일" @keyup.enter="SearchHandler"/>
            </v-col>
            <v-col  cols="12" md="2" sm="6">
              <TextSelection  v-model:selected="Input_Map_For_Search.isUsed" labelName="사용유뮤" :itemList="[{name: '선택', value: ''}, {name:'사용', value: 'TRUE' },{name:'미사용', value: 'FALSE' }]"
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
        <v-col v-if="isSearch" cols="2" class="mt-8">
          <span style="color : red;">{{totalLists}}</span>
          <span>건 검색</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="d-flex d-flex-inline ga-4">
            <v-btn class="mt-1" style="width:10px; height:50px;" to='/register'>등록</v-btn>
            <TextSelection v-model:selected="Input_Map_For_Search.showList" 
            :itemList="[
              {name:'10개씩 보기', value : '10'}, {name:'20개씩 보기', value:'20'}, {name:'50개씩 보기', value:'50'}, {name:'100개씩 보기', value:'100'}]"
              @update:modelValue="changeShowPage"/>
        </v-col>
    
      </v-row>
    </v-container>
  </v-container>

  <v-container v-if="isSearch">
      <ResultTable :tableItems="tableItems" :headers="headerss"/>
  </v-container>
  <v-container v-if="isSearch">
      <v-pagination v-model="Input_Map_For_Search.page" :length="numOfPage" :total-visible="8" @click="SearchHandler" ></v-pagination>
  </v-container>
</template>