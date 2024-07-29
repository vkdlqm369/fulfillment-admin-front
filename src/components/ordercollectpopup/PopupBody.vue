<template>
  <div class="popup-body" ref="popupBody">
    <!-- v-for를 사용하여 visibleOrders 배열의 각 주문 항목을 반복적으로 렌더링 -->
    <div v-for="(order, index) in visibleOrders" :key="index" class="order-item">
      <!-- 각 주문의 번호와 주문 번호를 화면에 표시 -->
      <span class="order-number">[{{ index + 1 }}번째 주문] {{ order.orderNo }}</span>
      <span class="order-detail">  상품번호 : {{ order.ordPrdNo }}</span>
      <!-- order.success가 true면 '성공', false면 '실패'로 텍스트를 표시하고, 이에 따라 CSS 클래스도 변경 -->
      <span :class="{ success: order.success, failure: !order.success }">
        {{ order.success ? ' 성공' : ' 실패' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

// 부모 컴포넌트에서 전달된 props를 정의
const props = defineProps({
  orders: {
    type: Array,
    required: true, // orders 배열 부모 컴포넌트에게 받음
  },
  updateCounts: {
    type: Function, // updateCounts Function 부모 컴포넌트에게 받음
    required: true,
  },
});

// 현재 화면에 표시될 주문 목록을 저장할 ref 변수
const visibleOrders = ref([]);
// popupBody 요소를 참조하기 위한 ref 변수
const popupBody = ref(null);

// 각 주문을 일정 간격으로 화면에 표시하는 함수
function showOrders() {
  const totalOrders = props.orders.length; // 전체 주문 개수를 가져옴
  const maxDuration = 5000; // 모든 주문을 표시하는 데 최대 5초를 설정
  // 주문 개수에 따라 각 주문을 표시하는 간격을 계산
  // 개당 0.1초 ( 5초 넘을 시 -> (5초 / 주문개수) )
  const interval = totalOrders > 50 ? maxDuration / totalOrders : 100;

  // 각 주문을 순차적으로 화면에 표시
  props.orders.forEach((order, index) => {
    setTimeout(async () => {
      visibleOrders.value.push(order); // 주문을 visibleOrders 배열에 추가

      // 성공/실패 카운트를 업데이트
      props.updateCounts(order.success); // 이 함수는 부모 컴포넌트에 정의되어 있어, 자식 컴포넌트에서 호출될 때 부모 컴포넌트의 상태를 직접 업데이트

      // Vue는 상태 변경이 일어날 때 DOM 업데이트를 비동기적으로 처리 -> 즉, 상태가 변경되어도 바로 DOM에 반영되지 않음
      // DOM이 실제로 업데이트된 후에 코드를 실행 -> 최신의 DOM 상태를 확실히 참조
      await nextTick(); // 주문을 visibleOrders에 추가한 후 DOM이 업데이트되기를 기다렸다가 스크롤을 제어하기 위해 사용 
      
      console.log(`Scrolling to bottom: ${popupBody.value.scrollHeight}`);
      // 스크롤을 맨 아래 자동 이동
      popupBody.value.scrollTop = popupBody.value.scrollHeight;
    }, index * interval); // 각 주문을 표시하는 간격을 설정
  });
}

// props.orders 배열이 변경될 때마다 showOrders 함수를 호출
watch(() => props.orders, (newOrders) => {
  console.log("Orders prop changed:", newOrders);
  showOrders();
}, { immediate: true }); // 컴포넌트가 처음 마운트될 때도 showOrders 함수를 즉시 실행

// 컴포넌트가 화면에 처음 렌더링될 때 showOrders 함수를 호출
onMounted(() => {
  showOrders();
});
</script>

<style scoped>
@import '@/assets/css/pretendard.css';

.popup-body {
  max-height: 60vh; /* 창 크기의 60%로 최대 높이 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤이 가능하도록 설정 */
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Pretendard-Regular', sans-serif;
}

.popup-body:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.order-item {
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
}

.order-number {
  font-size: 1em; /* 폰트 크기 조정 */
  color: #333;
}

.order-detail {
  font-size: 1em;
  color: #333;
  margin-right: 80px; /* 오른쪽 마진 추가 */
}

.success {
  color: #4caf50; /* 성공 시 녹색 */
  font-family: 'Pretendard-Semibold', sans-serif;
}

.failure {
  color: #f44336; /* 실패 시 빨간색 */
  font-family: 'Pretendard-Semibold', sans-serif;
}
</style>
