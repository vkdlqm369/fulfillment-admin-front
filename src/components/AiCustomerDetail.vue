<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 v-if="!isLoading">({{ customer.customerSegments }}) {{ customer.name }} 고객님의 주문 분석 </h2>
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p class="loading-message">{{ loadingMessage }}</p>
      </div>
      <div v-else>
        <section>
          <h3 class="history">최다 구매 목록</h3>
          <ul class="item-list">
            <li v-for="(order, index) in frequentOrders" :key="index">
              {{ order }}
            </li>
          </ul>
        </section>
        <section>
          <h3 class="recommend">AI 추천 상품</h3>
          <ul class="item-list">
            <li v-for="(recommendation, index) in customer.personalizedRecommendations" :key="index">
              {{ recommendation }}
            </li>
          </ul>
          <div class="reason-section">
            <img src="@/assets/chatgpt_logo.png" alt="ChatGPT Logo" class="reason-logo">
            <h3 class="reason-title">AI 상품 추천 사유</h3>
          </div>
          <p class="reason">{{ personalizedRecommendationsReason }}</p>
        </section>
        <div class="modal-footer">
          <button class="reanalyze-button" @click="reanalyzeData" :disabled="isReanalyzeDisabled">재분석</button>
          <button class="cancel-button" @click="handleClose">닫기</button>
        </div>
        <p v-if="isReanalyzeDisabled" class="reanalyze-timer">{{ reanalyzeTooltip }}</p>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { toRefs } from 'vue';
import moment from 'moment';

const props = defineProps({
  customer: Object,
});

const emit = defineEmits(['close']);

const { customer } = toRefs(props);

const frequentOrders = ref([]);
const personalizedRecommendationsReason = ref('');
const isLoading = ref(true); // 로딩 상태 추가
const loadingMessage = ref('Loading');
const isReanalyzeDisabled = ref(false);
const reanalyzeTooltip = ref('');

let reanalyzeInterval = null;

// 시간 비교 함수
const canReanalyze = (analyzedTime) => {
  const now = moment();
  const analyzedMoment = moment(analyzedTime);
  const duration = moment.duration(now.diff(analyzedMoment));
  const minutes = duration.asMinutes();
  return minutes >= 5;
};

// 남은 시간 업데이트 함수
const updateReanalyzeTooltip = (analyzedTime) => {
  const now = moment();
  const analyzedMoment = moment(analyzedTime);
  const duration = moment.duration(analyzedMoment.add(5, 'minutes').diff(now));
  const minutes = Math.floor(duration.asMinutes());
  const seconds = Math.floor(duration.asSeconds() % 60);
  reanalyzeTooltip.value = `${minutes}분 ${seconds}초 뒤에 AI 재분석이 가능합니다`;
};

// 고객 데이터를 가져옴
const fetchCustomerData = async (customerId) => {
  try {
    console.log("Fetching data for customer ID:", customerId);
    const response = await axios.get(`/api/CustomersAiAnalysis/${customerId}`);
    console.log("API response data:", response);

    // API 응답 데이터가 유효한지 확인
    if (response.data && response.data.frequentOrders && response.data.personalizedRecommendations && response.data.personalizedRecommendationsReason && response.data.customerSegments) {
      // API 응답 데이터를 반영
      frequentOrders.value = response.data.frequentOrders;
      personalizedRecommendationsReason.value = response.data.personalizedRecommendationsReason;
      customer.value.personalizedRecommendations = response.data.personalizedRecommendations;
      customer.value.customerSegments = response.data.customerSegments;
      customer.value.analyzedTime = response.data.analyzedTime;
      isLoading.value = false; // 모든 데이터를 받아왔을 때 로딩 상태 해제

      // 분석 가능 여부 확인
      clearInterval(reanalyzeInterval); // 기존 인터벌 제거
      if (!canReanalyze(response.data.analyzedTime)) {
        updateReanalyzeTooltip(response.data.analyzedTime);
        reanalyzeInterval = setInterval(() => {
          updateReanalyzeTooltip(response.data.analyzedTime);
          if (canReanalyze(response.data.analyzedTime)) {
            clearInterval(reanalyzeInterval);
            reanalyzeTooltip.value = '';
            isReanalyzeDisabled.value = false;
          }
        }, 1000);
        isReanalyzeDisabled.value = true;
      } else {
        reanalyzeTooltip.value = '';
        isReanalyzeDisabled.value = false;
      }
    } else {
      console.error("Invalid response data:", response.data);
    }
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
};

// 강제 고객 데이터를 가져옴
const forceFetchCustomerData = async (customerId) => {
  try {
    console.log("Forcing data fetch for customer ID:", customerId);
    const response = await axios.get(`/api/CustomersAiAnalysis/force/${customerId}`);
    console.log("API response data:", response);

    // API 응답 데이터가 유효한지 확인
    if (response.data && response.data.frequentOrders && response.data.personalizedRecommendations && response.data.personalizedRecommendationsReason && response.data.customerSegments) {
      // API 응답 데이터를 반영
      frequentOrders.value = response.data.frequentOrders;
      personalizedRecommendationsReason.value = response.data.personalizedRecommendationsReason;
      customer.value.personalizedRecommendations = response.data.personalizedRecommendations;
      customer.value.customerSegments = response.data.customerSegments;
      customer.value.analyzedTime = response.data.analyzedTime;
      isLoading.value = false; // 모든 데이터를 받아왔을 때 로딩 상태 해제

      // 분석 가능 여부 확인
      clearInterval(reanalyzeInterval); // 기존 인터벌 제거
      if (!canReanalyze(response.data.analyzedTime)) {
        updateReanalyzeTooltip(response.data.analyzedTime);
        reanalyzeInterval = setInterval(() => {
          updateReanalyzeTooltip(response.data.analyzedTime);
          if (canReanalyze(response.data.analyzedTime)) {
            clearInterval(reanalyzeInterval);
            reanalyzeTooltip.value = '';
            isReanalyzeDisabled.value = false;
          }
        }, 1000);
        isReanalyzeDisabled.value = true;
      } else {
        reanalyzeTooltip.value = '';
        isReanalyzeDisabled.value = false;
      }
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
    fetchCustomerData(newCustomer.id);
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

// 재분석 데이터 함수
const reanalyzeData = () => {
  isLoading.value = true; // 로딩 상태 시작
  forceFetchCustomerData(customer.value.id); // 강제 데이터 재분석 호출
};
</script>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 배경을 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 30px 40px; /* 패딩을 넉넉하게 */
  border-radius: 18px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-semibold', sans-serif;
}

.modal h2 {
  font-family: 'Pretendard-bold', sans-serif;
  margin-bottom: 30px;
  font-size: 1.8em;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.modal section {
  margin-bottom: 20px;
}

.modal section h3.history,
.modal section h3.recommend {
  font-size: 1.3em;
  font-weight: 500;
  color: #2484C6;
  margin-bottom: 5px;
}


.modal ul.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.modal ul.item-list li {
  margin-top : 1px;
  padding: 8px 0;
  font-size: 1em;
  color: #000000;
  border-bottom: 1px solid #ddd;
}

.modal ul.item-list li:last-child {
  border-bottom: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px; /* 위로 약간의 여백 추가 */
}

.cancel-button, .reanalyze-button {
  display: inline-block;
  font-family: 'Pretendard-semibold', sans-serif;
  background-color: #2484C6;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.cancel-button:hover, .reanalyze-button:hover {
  background-color: #0056b3;
}

.cancel-button:active, .reanalyze-button:active {
  background-color: #004085;
}

.cancel-button:disabled, .reanalyze-button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-message {
  font-family: 'Pretendard-semibold', sans-serif;
  font-size: 1.5em;
  color: #2484C6;
}

.reanalyze-timer {
  font-family: 'Pretendard-semibold', sans-serif;
  font-size: 0.9em;
  color: #ff0000;
  text-align: right;
  margin-top: 10px;
}

.spinner {
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2484C6;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.reason-section {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.reason-logo {
  height: 24px;
  margin-right: 10px;
}

.reason-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #00a67e;
  margin: 0;
}

.modal p.reason {
  font-size: 1em;
  font-family: 'Pretendard-medium', sans-serif;
  color: #555;
  text-align: left;
  margin-top: 10px; /* h3와 간격 조정 */
}



@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
