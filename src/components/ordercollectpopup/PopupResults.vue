<template>
  <div class="popup-results">
    <p>[결과] 총 {{ totalCount }}건이 처리되었습니다.</p>
    <p :class="{ success: true }">수집 성공: {{ successCount }}건</p>
    <p :class="{ failure: true }">수집 실패: {{ failureCount }}건</p>
  </div>
</template>

<script setup>
//부모 컴포넌트로부터 전달받은 props Data( 동적 결과 데이터를 정의 )
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
@import '@/assets/css/pretendard.css';

.popup-results {
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-SemiBold', sans-serif;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.popup-results:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.total {
  color: #333;
  margin-bottom: 10px;
}

.success {
  color: blue; /* 성공 시 녹색 */
}

.failure {
  color: #f44336; /* 실패 시 빨간색 */
}
</style>
