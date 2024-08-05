<template>
  <div class="popup-body" ref="popupBody">
    <!-- 로딩 메시지 표시 -->
    <div v-if="props.orders.length === 0 && loadingComplete" class="empty-message">
      해당 날짜의 수집 데이터가 존재하지 않습니다.
    </div>
    <!-- 주문 항목 표시 -->
    <div v-else>
      <div
        v-for="(order, index) in visibleOrders"
        :key="order.orderNo + '-' + order.ordPrdNo"
        class="order-item"
      >
        <div class="order-info">
          <span class="order-number">[{{ index + 1 }}번째 주문] {{ order.orderNo }}&nbsp;&nbsp;&nbsp;</span>
          <span class="order-detail">상품번호 : {{ order.ordPrdNo }}</span>
        </div>
        <div class="order-status">
          <span :class="{ success: order.success, failure: !order.success }" class="status-text">
            {{ order.success ? "성공" : `실패 : ${order.errMsg}` }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, nextTick} from "vue";

// 부모 컴포넌트에서 전달된 props를 정의
const props = defineProps({
  orders: {
    type: Array,
    required: true, // orders 배열 부모 컴포넌트에게 받음
  },
});

// 현재 화면에 표시될 주문 목록을 저장할 ref 변수
const visibleOrders = ref([]);
// popupBody 요소를 참조하기 위한 ref 변수
const popupBody = ref(null);
const loadingComplete = ref(false);
const emit = defineEmits(["loading-complete"]);

watch(() => props.orders, (newOrders) => {
  if (newOrders) {
    showOrders(newOrders);
  }
});

function showOrders(orders) {
  visibleOrders.value = [];
  loadingComplete.value = false;

  const totalOrders = orders.length; // 전체 주문 개수를 가져옴
  const interval = 100;

  // 각 주문을 순차적으로 화면에 표시
  orders.forEach((order, index) => {
    setTimeout(async () => {
      visibleOrders.value.push(order); // 주문을 visibleOrders 배열에 추가
      await nextTick(); // DOM 업데이트 후 스크롤 이동
      // 스크롤을 맨 아래 자동 이동
      popupBody.value.scrollTop = popupBody.value.scrollHeight;

      // 마지막 주문인 경우 로딩 완료 상태로 설정
      if (index === totalOrders - 1) {
        loadingComplete.value = true;
        emit("loading-complete");
      }
    }, index * interval); // 각 주문을 표시하는 간격을 설정
  });

  // orders 배열이 비어있는 경우 로딩 완료 상태로 설정
  if (totalOrders === 0) {
    loadingComplete.value = true;
    emit("loading-complete");
  }
}
</script>

<style scoped>
@import "@/assets/css/pretendard.css";

.popup-body {
  max-height: 60vh; /* 창 크기의 60%로 최대 높이 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤이 가능하도록 설정 */
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  font-family: "Pretendard-Regular", sans-serif;
}

.popup-body:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.order-item {
  position: relative; /* 에러 메시지를 절대 위치시키기 위한 부모 요소 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: default;
}

.order-info {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.order-number {
  font-size: 0.95em; /* 폰트 크기 조정 */
  color: #333;
}

.order-detail {
  font-size: 0.95em; /* 폰트 크기 조정 */
  color: #333;
}

.success {
  color: #4caf50; /* 성공 시 녹색 */
  font-family: "Pretendard-Semibold", sans-serif;
}

.failure {
  color: #f44336; /* 실패 시 빨간색 */
  font-size: 0.7em; 
  font-family: "Pretendard-Semibold", sans-serif;
}

.order-status {
  display: flex;
  align-items: center;
}

.status-text {
  display: inline;
}

.success-message {
  font-size: 0.65em; /* 폰트 크기를 작게 조정 */
  color: #4caf50;
  border-radius: 4px;
  padding: 2px 5px;
  display: none;
  white-space: nowrap;
  margin-left: 10px; /* 왼쪽 마진 추가하여 약간의 간격을 둠 */
}
</style>