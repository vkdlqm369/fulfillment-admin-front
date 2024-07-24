<template>
  <div class="popup-results">
    <p>[결과] 총 {{ totalCount }}건이 처리되었습니다.</p>
    <p :class="{ success: true }">수집 성공: {{ successCount }}건</p>
    <p :class="{ failure: true }">수집 실패: {{ failureCount }}건</p>
  </div>
</template>

<script setup>
//부모 컴포넌트로부터 전달받은 props를 정의
const props = defineProps({
  successCount: {
    type: Number,
    required: true,
  },
  failureCount: {
    type: Number,
    required: true,
  },
  totalCount: {
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

.success {
  color: blue;
}

.failure {
  color: red;
}


</style>
