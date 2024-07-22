<template>
  <div>
    <div class="header">
      <!--상단 헤드 영역-->
      <h4 class="header-text">타다닥 주문수집</h4>
    </div>

    <div class="filters">
      <div class="date-picker">
        <label for="startDate">수집기간</label>

        <div class="date-inputs">
           <!--첫 번째 datepicker-->
          <div class="datepicker-wrapper">
            <i class="fas fa-calendar-alt"></i>
            <flat-pickr
              v-model="startDate"
              :config="startConfig"
              class="datepicker-input"
              @input="updateStartDate"
            />
          </div>
          <span>~</span>
          <!--두 번째 datepicker-->
          <div class="datepicker-wrapper">
            <i class="fas fa-calendar-alt"></i>
            <flat-pickr
              v-model="endDate"
              :config="endConfig"
              class="datepicker-input"
              @input="updateEndDate"
            />
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="btn btn-collectOrders" @click="collectOrders">
          <i class="fas fa-shopping-cart"></i>
          <span>주문수집</span>
        </button>
        <!-- @click : 클릭 시. collectOrders method 호출 -->
        <button class="btn btn-refreshPage" @click="refreshPage">
          <i class="fas fa-sync-alt"></i>
          <span>새로고침</span>
        </button>
        <!-- @click : 클릭 시. collectOrders method 호출 -->
        <button class="btn btn-tmpcollectOrders" @click="tmpcollectOrders">
          <i class="fas fa-sync-alt"></i>
          <span>임시 주문수집</span>
        </button>
      </div>
    </div>
    <!-- 로딩 중일 때 표시 -->
    <div v-if="loading" class="loading">Loading...</div>
    <!-- 오류 메시지 표시 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 데이터를 자식 컴포넌트로 전달 -->
    <new-table :grouped-data="groupedData"></new-table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { useAxios } from '@vueuse/integrations/useAxios';
import NewTable from './NewTable.vue'; // 자식 컴포넌트 import

const emit = defineEmits(['openPopup']); // 이벤트 정의

const startDate = ref(getSavedDate("startDate"));
const endDate = ref(getSavedDate("endDate"));
const startConfig = {
  dateFormat: "Y-m-d",
  allowInput: true,
  onClose: updateStartDate,
};
const endConfig = {
  dateFormat: "Y-m-d",
  allowInput: true,
  minDate: startDate.value,
  onClose: updateEndDate,
};

const loading = ref(false); // 로딩 상태를 저장하는 ref
const error = ref(null); // 오류 메시지를 저장하는 ref
const groupedData = ref([]); // 데이터를 저장하는 ref

watch(startDate, (newDate) => {
  endConfig.minDate = newDate;
  if (endDate.value && new Date(endDate.value) < new Date(newDate)) {
    endDate.value = null; // 시작일 변경 시 종료일이 시작일 이전이면 초기화
  }
});

// 임시 데이터 삭제 예정
function collectOrders() {
  if (startDate.value && endDate.value) {
    const orders = [
      { id: 2018069545, status: '성공' },
      { id: 2018069546, status: '성공' },
      { id: 2018069547, status: '실패' },
      { id: 2018069548, status: '실패' },
      { id: 2018069549, status: '성공' },
      { id: 2018069550, status: '성공' },
      { id: 2018069551, status: '성공' },
      { id: 2018069552, status: '실패' },
      { id: 2018069553, status: '성공' },
      { id: 2018069554, status: '성공' },
    ];

    emit('openPopup', orders);
  } else {
    alert("날짜를 선택해 주세요."); // 시작일 or 종료일 선택 X
  }
}

async function refreshPage() {
  const currentPage = 0;
  const url = '/api/table';
  const params = { currentPage };

  loading.value = true;
  error.value = null;

  try {
    const { data, error } = await useAxios(url, { params });

    if (data.value) {
      console.log(data.value);
      groupedData.value = data.value;
      console.log(groupedData.value);
    } else {
      throw error.value;
    }
  } catch (err) {
    error.value = `Error: ${err.message || err}`;
  } finally {
    loading.value = false;
  }
}

async function tmpcollectOrders() {
  // 시작일과 종료일이 설정되어 있는지 확인
  if (startDate.value && endDate.value) {
    // REST API 요청을 보낼 URL
    const sellerNo = 2644; // 실제 sellerNo로 변경
    const status = "DELIVERED";
    const url = `/api/order/${sellerNo}`;

    // 요청 매개변수 설정
    const params = {
      startDate: formatDate(startDate.value),
      endDate: formatDate(endDate.value),
      status: status,
    };

    loading.value = true; // 로딩 시작
    error.value = null; // 이전 오류 초기화

    try {
      const { data, error } = await useAxios(url, { params });

      if (data.value) {
        alert(data.value)
      } else {
        throw error.value;
      }
    } catch (err) {
      error.value = `Error: ${err.message || err}`;
    } finally {
      loading.value = false; // 로딩 종료
    }
  } else {
    alert("날짜를 선택해 주세요."); // 시작일 or 종료일 선택 X
  }
}

function updateStartDate() {
  saveDate("startDate", startDate.value);
  endConfig.minDate = startDate.value; // 시작일 변경 시 minDate 업데이트
  if (endDate.value && new Date(endDate.value) < new Date(startDate.value)) {
    endDate.value = null; // 시작일을 변경할 때 종료일 초기화
  }
}

function updateEndDate() {
  saveDate("endDate", endDate.value); // 종료일이 선택될 때 호출 endDate 저장
}

function saveDate(key, date) {
  sessionStorage.setItem(key, date); // sessionStorage에 날짜를 저장
}

function getSavedDate(key) {
  return sessionStorage.getItem(key); // sessionStorage에서 날짜를 가져옴
}

function formatDate(date) { 
  if (!date) return "";
  const [year, month, day] = date.split("-"); // yyyy-mm-dd 형식에서 yyyy/mm/dd 형식으로 변환
  return `${year}-${month}-${day}`;
}
</script>

<script>
import NewTable from './NewTable.vue';

export default {
  components: {
    NewTable
  }
}
</script>

<style scoped>
@import "@/assets/button.css";

/* header 영역(타다닥 주문 수집)의 스타일 정의 */
.header {
  padding: 10px 20px;
  background-color: #2c3e50;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid #000;
}

.header-text {
  color: white;
  margin: 0;
  text-align: left;
}

/* 수집기간 박스 */
.filters {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  gap: 40px; /*날짜 선택, 주문 버튼 */
  border: 2px solid #000;
}

/* datepicker 스타일 */
.date-picker {
  display: flex;
  align-items: center;
}

/* datepicker 라벨 스타일 */
.date-picker label {
  margin-right: 50px;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
}

.date-inputs {
  display: flex;
  align-items: center;
}

.date-picker span {
  margin: 0 10px;
  color: black;
}

.datepicker-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.datepicker-wrapper i {
  position: absolute;
  left: 10px;
  color: #000;
}

/* datepicker 입력 필드 스타일 */
.datepicker-input {
  padding: 5px 5px 5px 25px; /* 아이콘 공간 확보 */
  border: 2px solid #000;
  border-radius: 5px;
  background-color: white;
  color: black;
  width: 150px;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.datepicker-input::placeholder {
  color: black !important;
}

/* button 영역의 스타일 */
.buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn i {
  margin-right: 5px;
}

.loading {
  color: blue;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
