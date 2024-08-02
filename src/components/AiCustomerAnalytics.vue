<template>
  <div>
    <header class="header">
      <h2 class="header-title">Customer Analysis Dashboard</h2>
      <div class="header-buttons">
        <button @click="loadTempTable">Load Temp Table</button>
      </div>
    </header>
    <div class="table-container">
      <template v-if="filteredCustomers.length === 0">
        <p class="no-data-message">Load Temp Table 버튼을 눌러주세요</p>
      </template>
      <template v-else>
        <table class="modern-table">
          <thead>
            <tr>
              <th class="column-no">NO.</th>
              <th class="column-name">이름</th>
              <th class="column-phone">휴대폰 번호</th>
              <th class="column-orders">통합 주문 건수</th>
              <th class="column-analysis">고객 맞춤 AI 주문 분석</th>
              <th class="column-time">주문 분석 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in sortedCustomers" :key="customer.id" @click="selectCustomer(customer)">
              <td class="column-no">{{ index + 1 }}</td>
              <td class="column-name">{{ customer.name }}</td>
              <td class="column-phone">{{ formatPhoneNumber(customer.phoneNumber) }}</td>
              <td class="column-orders">{{ customer.orderCount }}</td>
              <td class="column-analysis" :class="{'analysis-pending': !customer.personalizedRecommendations, 'analysis-completed': customer.personalizedRecommendations}">
                {{ getAnalysisText(customer) }}
              </td>
              <td class="column-time">{{ formatAnalyzedTime(customer.analyzedTime) }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <AiCustomerDetail v-if="showModal" :customer="selectedCustomer" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // Axios를 가져옵니다
import AiCustomerDetail from './AiCustomerDetail.vue';

const customers = ref([]);
const searchQuery = ref('');
const selectedCustomer = ref(null);
const showModal = ref(false);

const loadTempTable = async () => {
  // 임시 데이터를 로드하는 API 요청
  const response = await fetch('/api/CustomersAiAnalysis');
  const data = await response.json();
  customers.value = data.orders;
  saveToSessionStorage(data.orders);
};

const saveToSessionStorage = (data) => {
  sessionStorage.setItem('customers', JSON.stringify(data));
};

const loadFromSessionStorage = () => {
  const data = sessionStorage.getItem('customers');
  if (data) {
    customers.value = JSON.parse(data);
  }
};

onMounted(() => {
  loadFromSessionStorage();
});

const filteredCustomers = computed(() => {
  return Array.isArray(customers.value) ? customers.value.filter(customer => customer.name.includes(searchQuery.value)) : [];
});

const sortedCustomers = computed(() => {
  return filteredCustomers.value.slice().sort((a, b) => b.orderCount - a.orderCount);
});

const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

const formatAnalyzedTime = (analyzedTime) => {
  return analyzedTime ? analyzedTime.split('.')[0] : '';
};

const selectCustomer = (customer) => {
  if (customer.orderCount < 3) {
    console.log("주문 건수가 적어서 분석할 수 없습니다.");
    return;
  }

  selectedCustomer.value = customer;
  showModal.value = true;

  if (!customer.personalizedRecommendations) {
    // 모달이 열리자마자 데이터를 비동기적으로 가져옵니다.
    fetchCustomerData(customer.id);
  }
};

const fetchCustomerData = async (customerId) => {
  try {
    console.log("Fetching data for customer ID:", customerId);
    const response = await axios.get(`/api/CustomersAiAnalysis/${customerId}`);
    console.log("API response:", response); // 전체 API 응답 로그
    if (response.data) {
      const index = customers.value.findIndex(c => c.id === customerId);
      if (index !== -1) {
        // 데이터를 로컬 상태에 업데이트
        customers.value[index].personalizedRecommendations = response.data.personalizedRecommendations;
        customers.value[index].frequentOrders = response.data.frequentOrders;
        customers.value[index].personalizedRecommendationsReason = response.data.personalizedRecommendationsReason;
        customers.value[index].customerSegments = response.data.customerSegments;
        customers.value[index].analyzedTime = new Date().toISOString();
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
  const index = customers.value.findIndex(c => c.id === updatedCustomer.id);
  if (index !== -1) {
    customers.value[index] = { ...updatedCustomer };
    saveToSessionStorage(customers.value);
  }
};

const getAnalysisText = (customer) => {
  if (customer.orderCount < 3) {
    return '주문 건수가 적어서 분석할 수 없습니다. 주문 분석은 3회 이상 수집되어야 제공됩니다.';
  }
  return customer.personalizedRecommendations ? '추천 상품: ' + customer.personalizedRecommendations.join(', ') : '주문 분석을 하시려면 해당 고객을 클릭해주세요';
};
</script>

<style scoped>
@import '@/assets/css/pretendard.css';

.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 제목과 버튼을 양쪽 끝으로 배치 */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
  margin-bottom: 0px;
  color: rgb(9, 77, 122);
  width: 100%; /* 화면에 맞게 너비 설정 */
  height: 75px; /* 고정된 높이 */
}

.header-title {
  margin: 0; /* 기본 margin 제거 */
}

.header-buttons {
  display: flex;
  align-items: center;
}

.header-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #2484c6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-family: 'Pretendard-SemiBold', sans-serif;
}

.header-buttons button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.header-buttons button:active {
  background-color: #1f6391;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: 'Pretendard-Regular', sans-serif;
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
  width: 10%; /* Phone Number 열의 너비 조정 */
}

.modern-table th.column-orders,
.modern-table td.column-orders {
  width: 1%; /* 통합 주문 건수 열의 너비 조정 */
}

.modern-table th.column-analysis,
.modern-table td.column-analysis {
  width: 70%; /* Ai Customer Analysis 열의 너비 조정 */
}

.modern-table th.column-time,
.modern-table td.column-time {
  width: 10%; /* 주문 분석 시간 열의 너비 조정 */
}

.modern-table thead {
  background-color: #2484C6;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Pretendard-Semibold', sans-serif;
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
  color: #000000;
}

.analysis-pending {
  font-size: 1em;
  color: #eb3312d5; /* 주문 분석을 하시려면 해당 고객을 클릭해주세요 */
  font-style: italic;
}

.analysis-completed {
  font-size: 1em;
  color: #1dbfdbc5; /* 주문 분석 완료 */
  font-weight: bold;
}

.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #6c757d;
  font-family: 'Pretendard', sans-serif;
}

/* 반응형 디자인 */
@media screen and (max-width: 768px) {
  .modern-table th,
  .modern-table td {
    padding: 12px;
    font-size: 0.9em;
  }

  .modern-table th.column-no,
  .modern-table td.column-no,
  .modern-table th.column-phone,
  .modern-table td.column-phone {
    display: none; /* 작은 화면에서 No. 열과 Phone Number 열 숨기기 */
  }
}
</style>
