<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 v-if="!isLoading">{{ customer.name }} 고객님의 주문 분석 ({{ customer.customerSegments }})</h2>
      <div v-if="isLoading" class="loading">
        <p>{{ loadingMessage }}</p>
      </div>
      <div v-else>
        <section>
          <h3>이전 구매목록</h3>
          <ul class="item-list">
            <li v-for="(order, index) in frequentOrders" :key="index">
              {{ order }}
            </li>
          </ul>
        </section>
        <section>
          <h3>추천 상품</h3>
          <ul class="item-list">
            <li v-for="(recommendation, index) in customer.personalizedRecommendations" :key="index">
              {{ recommendation }}
            </li>
          </ul>
          <p class="reason">{{ personalizedRecommendationsReason }}</p>
        </section>
      </div>
      <div class="modal-footer" v-if="!isLoading">
        <button class="cancel-button" @click="handleClose">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { toRefs } from 'vue';

const props = defineProps({
  customer: Object,
});

const emit = defineEmits(['close']);

const { customer } = toRefs(props);

const frequentOrders = ref([]);
const personalizedRecommendationsReason = ref('');
const isLoading = ref(true); // 로딩 상태 추가
const loadingMessage = ref('Loading');

const fetchCustomerData = async (customerId) => {
  try {
    console.log("Fetching data for customer ID:", customerId);
    const response = await axios.get(`/api/CustomersAiAnalysis/${customerId}`);
    console.log("API response data:", response);
    if (response.data && response.data.frequentOrders && response.data.personalizedRecommendations && response.data.personalizedRecommendationsReason && response.data.customerSegments) {
      frequentOrders.value = response.data.frequentOrders;
      personalizedRecommendationsReason.value = response.data.personalizedRecommendationsReason;
      customer.value.personalizedRecommendations = response.data.personalizedRecommendations;
      customer.value.customerSegments = response.data.customerSegments;
      customer.value.analyzedTime = new Date().toISOString();
      isLoading.value = false; // 모든 데이터를 받아왔을 때 로딩 상태 해제
    } else {
      console.error("Invalid response data:", response.data);
    }
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
};

// customer가 변경될 때마다 데이터 재로딩
watch(customer, (newCustomer) => {
  if (newCustomer && newCustomer.id) {
    isLoading.value = true; // 데이터 로딩 시작
    if (newCustomer.personalizedRecommendations) {
      // 이미 분석된 데이터가 있는 경우 로딩하지 않음
      frequentOrders.value = newCustomer.frequentOrders;
      personalizedRecommendationsReason.value = newCustomer.personalizedRecommendationsReason;
      isLoading.value = false;
    } else {
      fetchCustomerData(newCustomer.id);
    }
  }
}, { immediate: true });

// 로딩 메시지 업데이트
onMounted(() => {
  loadingMessage.value = '주문 분석중';
  setInterval(() => {
    if (isLoading.value) {
      loadingMessage.value = loadingMessage.value === '주문 분석중...' ? '주문 분석중' : loadingMessage.value + '.';
    }
  }, 500);
});

const handleClose = () => {
  emit('close', customer.value);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 18px;
  width: 90%; 
  max-width: 700px;
  height: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal h2 {
  margin-bottom: 60px;
  font-size: 1.5em;
  text-align: center;
}

.modal section {
  margin-bottom: 20px;
}

.modal ul.item-list {
  list-style: none;
  margin-bottom: 30px;
}

.modal ul.item-list li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 0.9em; 
}

.modal ul.item-list li:last-child {
  border-bottom: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: absolute;
  bottom: 30px; 
  right: 20px; 
}

.modal p.reason {
  font-size: 0.9em;
  color: #3c84a5;
}

.cancel-button {
  display: inline-block;
  background-color: #6091e0;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button:hover {
  background-color: #155ab6;
}

.cancel-button:active {
  background-color: #0e3d91;
}

.cancel-button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
}
</style>
