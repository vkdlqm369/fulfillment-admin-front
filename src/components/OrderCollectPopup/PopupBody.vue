<template>
  <div class="popup-body">
    <!-- orders 배열의 각 주문을 반복하여 표시 -->
    <div v-for="(order, index) in orders" :key="index">
      <!-- 주문의 인덱스와 id를 표시 -->
      <span>{{ index + 1 }}번째 주문 {{ order.id }}</span>
      <span :class="{ success: order.status === '성공', failure: order.status === '실패' }">
        {{ order.status }}
      </span>
    </div>
  </div>
</template>

<script>

//orders array를 props로 받음
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.success {
  color: green;
}
.failure {
  color: red;
}
</style>
