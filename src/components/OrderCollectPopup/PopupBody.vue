<template>
  <div class="popup-body">
    <div v-for="(order, index) in orders" :key="index">
      <span>{{ index + 1 }}번째 주문 {{ order.id }}</span>
      <span :class="{ success: order.status === '성공', failure: order.status === '실패' }">
        {{ order.status }}
      </span>
    </div>
  </div>
</template>

<script>
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
