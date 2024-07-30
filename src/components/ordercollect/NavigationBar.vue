<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div>
    <div class="filters">
      <div class="date-picker">
        <label for="startDate">수집기간</label>
        <div class="date-inputs">
          <!--첫 번째 datepicker-->
          <div class="datepicker-wrapper">
            <i class="fas fa-calendar-alt"></i>
            <flat-pickr
              v-model="dates.startDate"
              :config="startConfig"
              placeholder="시작일"
              class="datepicker-input"
              @input="updateStartDate"
            />
          </div>
          <span>~</span>
          <!--두 번째 datepicker-->
          <div class="datepicker-wrapper">
            <i class="fas fa-calendar-alt"></i>
            <flat-pickr
              v-model="dates.endDate"
              :config="endConfig"
              placeholder="종료일"
              class="datepicker-input"
              @input="updateEndDate"
            />
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="btn btn-collectOrders" @click="openPopupWindow">
          <i class="fas fa-shopping-cart"></i>
          <span>주문수집</span>
        </button>
        <!-- @click : 클릭 시. refreshPage method 호출 -->
        <button class="btn btn-refreshPage" @click="refreshPage">
          <i class="fas fa-sync-alt"></i>
          <span>새로고침</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { useAxios } from "@vueuse/integrations/useAxios";

const emit = defineEmits(["refreshPage"]);

const dates = reactive({
  startDate: getSavedDate("startDate"),
  endDate: getSavedDate("endDate"),
});

const startConfig = {
  dateFormat: "Y-m-d",
  allowInput: false,
  onClose: updateStartDate,
};

const endConfig = reactive({
  dateFormat: "Y-m-d",
  allowInput: false,
  minDate: dates.startDate,
  onClose: updateEndDate,
});

function updateStartDate() {
  saveDate("startDate", dates.startDate);
  endConfig.minDate = dates.startDate; // 시작일 변경 시 minDate 업데이트
  if (dates.endDate && new Date(dates.endDate) < new Date(dates.startDate)) {
    dates.endDate = null; // 시작일을 변경할 때 종료일 초기화
  }
}

function updateEndDate() {
  saveDate("endDate", dates.endDate); // 종료일이 선택될 때 호출 endDate 저장
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

async function openPopupWindow() {
  // 시작일과 종료일이 설정되어 있는지 확인
  console.log("openPopupWindow called");
  if (dates.startDate && dates.endDate) {
    // 팝업 창 먼저 열기
    const popup = window.open('/order-collect-popup', '_blank', 'width=600,height=700,overflow=hidden');

    // REST API 요청을 보낼 URL
    const sellerNo = 2644; // 실제 sellerNo로 변경
    const status = "DELIVERED";
    const url = `/api/order/${sellerNo}`;

    // 요청 매개변수 설정
    const params = {
      startDate: formatDate(dates.startDate),
      endDate: formatDate(dates.endDate),
      status: status,
    };

    // API 요청 보내기
    const { data, error } = await useAxios(url, { params });

    if (data.value) {
      console.log("Data received:", data.value);
      // 데이터를 준비한 후 팝업 창에 메시지 전달
      if (popup) {
        popup.postMessage(JSON.stringify(data.value), '*');
      }
    } else {
      console.error("Error fetching data:", error.value);
      throw error.value;
    }
  } else {
    alert("날짜를 선택해 주세요.");
  }
}

function refreshPage() {
  console.log("Emitting refreshPage event");
  emit("refreshPage");
}

const startDatePicker = ref(null);
const endDatePicker = ref(null);

onMounted(() => {
  if (startDatePicker.value && dates.startDate) {
    startDatePicker.value.flatpickr.setDate(dates.startDate);
  }
  if (endDatePicker.value && dates.endDate) {
    endDatePicker.value.flatpickr.setDate(dates.endDate);
  }
});
</script>

<style scoped>
@import "@/assets/css/pretendard.css";

/* 수집기간 박스 */
.filters {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px; /* 반경을 추가하여 더 부드럽게 만듦 */
  gap: 20px; /* 날짜 선택과 버튼 사이의 간격을 조정 */
  border: 1px solid #e0e0e0; /* 부드러운 테두리 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 박스에 그림자 추가 */
  font-family: 'Pretendard-Regular', sans-serif;
  justify-content: center; /* 전체적인 정렬을 중앙으로 이동 */
}

/* datepicker 스타일 */
.date-picker {
  display: flex;
  align-items: center;
  gap: 10px; /* 라벨과 입력 필드 사이의 간격 조정 */
}

.date-picker label {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: black;
  margin-right: 10px;
}

.date-picker label i {
  margin-left: 5px; /* 아이콘과 텍스트 사이의 간격 조정 */
  color: #2484C6; /* 아이콘 색상 */
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 10px; /* 입력 필드와 구분자 사이의 간격 조정 */
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
  color: #2484C6; /* 아이콘 색상 */
}

.datepicker-input {
  padding: 8px 12px; /* 입력 필드의 패딩 조정 */
  border: 1px solid #e0e0e0; /* 부드러운 테두리 */
  border-radius: 8px; /* 반경을 추가하여 더 부드럽게 만듭니다 */
  background-color: white;
  color: black;
  width: 150px;
  box-sizing: border-box;
  text-align: left; /* 입력 필드 텍스트를 왼쪽 정렬 */
  padding-left: 39px; /* 아이콘 공간 확보 */
  padding-top: 10px; /* 아이콘 공간 확보 */
  cursor: pointer;
}

.datepicker-input::placeholder {
  color: black !important;
}

/* button 영역의 스타일 */
.buttons {
  display: flex;
  align-items: center;
  gap: 15px; /* 버튼 사이의 간격을 조정합니다 */
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px; /* 버튼 패딩 조정 */
  background-color: #2484C6; /* 버튼 배경색 */
  color: #ffffff; /* 버튼 텍스트 색 */
  border: 1px solid #e0e0e0; /* 부드러운 테두리 */
  border-radius: 8px; /* 버튼의 모서리를 둥글게 만듭니다 */
  font-family: 'Pretendard-SemiBold', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #1e6fa1; /* 호버 시 버튼 배경색 */
  transform: translateY(-2px); /* 호버 시 버튼 이동 효과 */
}

.btn:active {
  background-color: #195a7e; /* 클릭 시 버튼 배경색 */
  transform: translateY(0); /* 클릭 시 버튼 이동 효과 제거 */
}

.btn i {
  margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 조정 */
}

.btn-collectOrders i::before {
  content: "\f07a"; /* FontAwesome 쇼핑카트 아이콘 */
}

.btn-refreshPage i::before {
  content: "\f2f1"; /* FontAwesome 새로고침 아이콘 */
}
</style>
