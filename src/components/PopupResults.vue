<template>
    <div class="popup-results">
      <p>총 {{ orders.length }}건이 처리되었습니다.</p>
      <p>수집 성공: {{ successCount }}건</p>
      <p>수집 실패: {{ failureCount }}건</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    orders: {
      type: Array,
      required: true,
    },
    successCount: {
      type: Number,
      required: true,
    },
    failureCount: {
      type: Number,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .popup-results {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  