<template>
  <div>
    <header class="header">
      <h2>Customer Analysis Dashboard</h2>
    </header>
    <div class="table-container">
      <template v-if="filteredCustomers.length === 0">
        <p class="no-data-message">No customers found.</p>
      </template>
      <template v-else>
        <table class="modern-table">
          <thead>
            <tr>
              <th class="column-no">NO.</th>
              <th class="column-name">이름</th>
              <th class="column-phone">휴대폰 번호</th>
              <th class="column-analysis">고객 맞춤 AI 주문 분석</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in filteredCustomers" :key="customer.id" @click="selectCustomer(customer)">
              <td class="column-no">{{ index + 1 }}</td>
              <td class="column-name">{{ customer.name }}</td>
              <td class="column-phone">{{ customer.phoneNumber }}</td>
              <td class="column-analysis" :class="{'analysis-pending': !customer.aiCollected, 'analysis-completed': customer.aiCollected}">
                {{ getAnalysisText(customer) }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <AiCustomerDetail v-if="showModal" :customer="selectedCustomer" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AiCustomerDetail from './AiCustomerDetail.vue';

const customers = ref([]);

const searchQuery = ref('');
const selectedCustomer = ref(null);
const showModal = ref(false);

onMounted(() => {
  // 예시 데이터를 로드
  customers.value = [
    { id: 1, name: '김준영', phoneNumber: '01038841210', aiCollected: false },
    { id: 2, name: '이흥원', phoneNumber: '01093171421', aiCollected: false },
    { id: 3, name: '한서우', phoneNumber: '01034567890', aiCollected: false },
    { id: 4, name: '강민성', phoneNumber: '01045678901', aiCollected: false },
    { id: 5, name: '최서현', phoneNumber: '01056789012', aiCollected: false },
    { id: 6, name: '유민호', phoneNumber: '01067890123', aiCollected: false },
    { id: 7, name: '윤도윤', phoneNumber: '01078901234', aiCollected: false },
    { id: 8, name: '강지훈', phoneNumber: '01090123456', aiCollected: false },
    { id: 9, name: '박민지', phoneNumber: '01001234567', aiCollected: false },
    { id: 10, name: '이준서', phoneNumber: '01023456789', aiCollected: false }
  ];
});

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => customer.name.includes(searchQuery.value));
});

const selectCustomer = (customer) => {
  if (!customer.aiCollected) {
    /*
    API 호출
    await fetch(`https://api.example.com/analyze/${customer.id}`, { method: 'GET' });
    customer.aiCollected = true; // AI 분석 완료
    DB 저장 로직을 추가
    */
  }
  selectedCustomer.value = customer;
  showModal.value = true;
};

const closeModal = () => {
  selectedCustomer.value.aiCollected = true; // 임시로 aiCollected 값을 true로 변경
  showModal.value = false;
};

const getAnalysisText = (customer) => {
  return customer.aiCollected ? '주문 수집이 완료 되었습니다. 확인하시려면 해당 고객을 클릭해주세요' : '주문 분석을 하시려면 해당 고객을 클릭해주세요';
};
</script>

<style scoped>
@import '@/assets/css/pretendard.css';

.header {
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.modern-table th.column-no,
.modern-table td.column-no {
  width: 50px; /* No. 열의 너비 조정 */
}

.modern-table th.column-name,
.modern-table td.column-name {
  width: 200px; /* Name 열의 너비 조정 */
}

.modern-table th.column-phone,
.modern-table td.column-phone {
  width: 150px; /* Phone Number 열의 너비 조정 */
}

.modern-table th.column-analysis,
.modern-table td.column-analysis {
  width: 250px; /* Ai Customer Analysis 열의 너비 조정 */
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
