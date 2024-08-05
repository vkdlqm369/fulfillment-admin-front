<template>
  <div>
    <header class="header">
      <div class="header-content">
        <img
          src="@/assets/chatgpt_logo.png"
          alt="ChatGPT Logo"
          class="header-logo"
        />
        <h2 class="header-title">
          GPT-4o 기반 고객 상품 추천 및 취향 분석 대시보드
        </h2>
        <p class="header-notice">
          기존 주문 분석 시간으로부터 30분 후에 고객을 클릭하면, AI 고객 추천 상품 리스트가 자동으로 갱신됩니다.
        </p>
      </div>
    </header>
    <div class="table-container">
      <template v-if="filteredCustomers.length === 0">
        <p class="no-data-message">현재 주문수집 데이터가 존재하지 않습니다.</p>
      </template>
      <template v-else>
        <table class="modern-table">
          <thead>
            <tr>
              <th class="column-no">NO.</th>
              <th class="column-name">이름</th>
              <th class="column-phone">휴대폰 번호</th>
              <th class="column-orders">주문 건수</th>
              <th class="column-analysis">고객 AI 추천 상품 리스트</th>
              <th class="column-time">주문 분석 일시</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(customer, index) in sortedCustomers"
              :key="customer.id"
              @click="selectCustomer(customer)"
            >
              <td class="column-no">{{ index + 1 }}</td>
              <td class="column-name">{{ customer.name }}</td>
              <td class="column-phone">
                {{ formatPhoneNumber(customer.phoneNumber) }}
              </td>
              <td class="column-orders">{{ customer.orderCount }}</td>
              <td :class="getAnalysisClass(customer)">
                {{ getAnalysisText(customer) }}
              </td>
              <td class="column-time">
                {{ formatAnalyzedTime(customer.analyzedTime) }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <AiCustomerDetail
      v-if="showModal"
      :customer="selectedCustomer"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AiCustomerDetail from "./AiCustomerDetail.vue";

const customers = ref([]);
const searchQuery = ref("");
const selectedCustomer = ref(null);
const showModal = ref(false);

// 세션 스토리지에 데이터를 저장하는 함수
const saveToSessionStorage = (data) => {
  sessionStorage.setItem("customers", JSON.stringify(data));
};

// 세션 스토리지에서 데이터를 로드하는 함수
const loadFromSessionStorage = () => {
  const data = sessionStorage.getItem("customers");
  if (data) {
    customers.value = JSON.parse(data);
  }
};

// 컴포넌트가 마운트될 때 세션 스토리지에서 데이터를 로드함
onMounted(() => {
  loadFromSessionStorage();
});

const filteredCustomers = computed(() => {
  return Array.isArray(customers.value)
    ? customers.value.filter((customer) =>
        customer.name.includes(searchQuery.value)
      )
    : [];
});


// 필터링된 고객 데이터를 주문 건수 기준으로 정렬하는 함수
const sortedCustomers = computed(() => {
  return filteredCustomers.value
    .slice()
    .sort((a, b) => b.orderCount - a.orderCount);
});

const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

const formatAnalyzedTime = (analyzedTime) => {
  return analyzedTime ? analyzedTime.split(".")[0].replace('T', ' ') : "";
};


// 고객을 선택할 때 호출되는 함수
const selectCustomer = (customer) => {
  if (customer.orderCount < 3) {
    console.log("주문 건수가 적어서 분석할 수 없습니다.");
    return;
  }

  selectedCustomer.value = customer;
  showModal.value = true;

  if (!customer.personalizedRecommendations) {
    fetchCustomerData(customer.id);
  }
};
// 고객 데이터를 가져옴
const fetchCustomerData = async (customerId) => {
  try {
    console.log("Fetching data for customer ID:", customerId);
    const response = await axios.get(`/api/CustomersAiAnalysis/${customerId}`);
    console.log("API response:", response); // 전체 API 응답 로그
    if (response.data) {
      // 주어진 고객 ID로 API 요청을 보내서 고객 데이터를 가져옴
      const index = customers.value.findIndex((c) => c.id === customerId);
      if (index !== -1) {
        customers.value[index].personalizedRecommendations =
          response.data.personalizedRecommendations;
        customers.value[index].frequentOrders = response.data.frequentOrders;
        customers.value[index].personalizedRecommendationsReason =
          response.data.personalizedRecommendationsReason;
        customers.value[index].customerSegments =
          response.data.customerSegments;
        customers.value[index].analyzedTime = response.data.analyzedTime;
        // 업데이트된 고객 데이터를 세션 스토리지에 저장
        saveToSessionStorage(customers.value);
      }
    } else {
      console.error("Invalid response data:", response.data);
    }
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
};

const handleCloseModal = (updatedCustomer) => {
  showModal.value = false;
  const index = customers.value.findIndex((c) => c.id === updatedCustomer.id);
  if (index !== -1) {
    customers.value[index] = { ...updatedCustomer };
    saveToSessionStorage(customers.value);
  }
};

// 고객의 주문 분석 상태에 따라 CSS 클래스를 반환
const getAnalysisClass = (customer) => {
  if (customer.orderCount < 3) {
    return "analysis-low-orders";
  }
  return customer.personalizedRecommendations
    ? "analysis-completed"
    : "analysis-pending";
};

// 고객의 주문 분석 상태에 따라 텍스트를 반환하는 함수
const getAnalysisText = (customer) => {
  if (customer.orderCount < 3) {
    return "분석을 위해 고객님의 주문건수가 최소 3건 이상 필요합니다.";
  }
  return customer.personalizedRecommendations
    ? "[추천 상품]  " + customer.personalizedRecommendations.join(", ")
    : "해당 고객의 추천 상품 리스트 및 취향 분석이 가능한 상태입니다.";
};

function formatordCollectDttm(ordCollectDttm) {
  return ordCollectDttm.replace('T', ' ');
}

</script>

<style scoped>
@import "@/assets/css/pretendard.css";

.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 제목과 버튼을 양쪽 끝으로 배치 */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Pretendard-Regular", sans-serif;
  color: rgb(9, 77, 122);
  width: 100%; /* 화면에 맞게 너비 설정 */
  height: 75px; /* 고정된 높이 */
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  /* 로고와 제목을 중앙 정렬 */
}

.header-logo {
  height: 40px; /* 로고 높이 설정 */
  margin-right: 10px; /* 제목과의 간격 설정 */
}

.header-title {
  margin: 0; /* 기본 margin 제거 */
  color: #00a67e; /* 텍스트 색상 변경 */
  flex-grow: 1;
}

.header-notice {
  position: absolute;
  bottom: -15px;
  right: 0;
  font-size: 0.8em;
  color: #666;
  text-align: right;
  margin-top: 10px;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 50px;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: "Pretendard-Regular", sans-serif;
  text-align: center; /* 모든 요소 가운데 정렬 */
}

.modern-table th,
.modern-table td {
  padding: 16px;
  white-space: nowrap;
  transition: background-color 0.3s ease, color 0.3s ease;
  height: 50px; /* 모든 행의 기본 높이 설정 */
  border-top: 1px solid #b6bfc5; /* 상단 구분선을 위한 보더 추가 */
  border-bottom: 1px solid #b6bfc5; /* 하단 구분선을 위한 보더 추가 */
  border-left: none; /* 좌측 구분선 제거 */
  border-right: none; /* 우측 구분선 제거 */
}

.modern-table th {
  border: none; /* 테이블 제목(th)의 보더를 제거 */
}

.modern-table th.column-no,
.modern-table td.column-no {
  width: 5%; /* No. 열의 너비 조정 */
}

.modern-table th.column-name,
.modern-table td.column-name {
  width: 10%; /* Name 열의 너비 조정 */
}

.modern-table th.column-phone,
.modern-table td.column-phone {
  width: 15%; /* Phone Number 열의 너비 조정 */
}

.modern-table th.column-orders,
.modern-table td.column-orders {
  width: 5%; /* 통합 주문 건수 열의 너비 조정 */
}

.modern-table th.column-analysis,
.modern-table td.column-analysis {
  padding-left: 20px;
  width: 55%; /* Ai Customer Analysis 열의 너비 조정 */
}

.modern-table th.column-time,
.modern-table td.column-time {
  width: 15%; /* 주문 분석 시간 열의 너비 조정 */
}

.modern-table thead {
  background-color: #2484c6;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: "Pretendard-Semibold", sans-serif;
}

.modern-table tbody {
  cursor: pointer;
}
  

.modern-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.modern-table tbody tr:last-child {
  border-bottom: none;
}

.modern-table td {
  background-color: #ffffff;
}

.modern-table tr:hover td {
  background-color: #f9f9f9;
  color: #3b8a94c5;
}

.analysis-pending {
  /* 텍스트를 오른쪽으로 이동 */
  text-align: center;
  font-size: 1em;
  color: #000000d5; /* 주문 분석을 하시려면 해당 고객을 클릭해주세요 */
  font-style: italic;
}

.analysis-completed {
  text-align: left;
  font-size: 1em;
  color: #333; /* 좀 더 가독성 좋은 색상으로 변경 */
  font-weight: bold;
  background-color: #f0f8ff; /* 배경색을 추가하여 강조 */
  padding: 10px; /* 텍스트 주변에 여백 추가 */
  border-radius: 5px; /* 모서리를 둥글게 처리 */
}

.analysis-low-orders {
  text-align: center;
  font-size: 1em;
  color: red; /* 주문 건수가 적어서 분석할 수 없습니다. */
  font-style: italic;
  cursor: not-allowed;
}

.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #6c757d;
  font-family: "Pretendard", sans-serif;
}

/* 반응형 디자인 */
@media screen and (max-width: 768px) {
  .modern-table th,
  .modern-table td {
    padding: 12px;
    font-size: 0.9em;
  }
}
</style>
