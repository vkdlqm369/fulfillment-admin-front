<template>
  <div class="popup-body" ref="popupBody">
    <div v-for="(order, index) in visibleOrders" :key="index">
      <span>{{ index + 1 }}번째 주문 {{ order.orderNo }}</span>
      <span :class="{ success: order.success, failure: !order.success }">
        {{ order.success ? ' 성공' : ' 실패' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  orders: {
    type: Array,
    required: true,
  },
  updateCounts: {
    type: Function,
    required: true,
  },
});

const visibleOrders = ref([]);
const popupBody = ref(null);

// 각 주문을 표시하는 함수
function showOrders() {
  const totalOrders = props.orders.length;
  const maxDuration = 5000; // 최대 5초
  const interval = totalOrders > 50 ? maxDuration / totalOrders : 100; // 주문 개수에 따른 간격 계산

  props.orders.forEach((order, index) => {
    setTimeout(async () => {
      visibleOrders.value.push(order);
      props.updateCounts(order.success);
      await nextTick(); // DOM 업데이트 후 스크롤 이동
      console.log(`Scrolling to bottom: ${popupBody.value.scrollHeight}`);
      popupBody.value.scrollTop = popupBody.value.scrollHeight;
    }, index * interval);
  });
}

watch(() => props.orders, (newOrders) => {
  console.log("Orders prop changed:", newOrders);
  showOrders();
}, { immediate: true });

onMounted(() => {
  showOrders();
});

</script>

<style scoped>
.popup-body {
  max-height: 60vh; /* 창 크기의 60%로 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.success {
  color: blue;
}

.failure {
  color: red;
}

.popup-body div {
  margin-bottom: 5px;
}
</style>
