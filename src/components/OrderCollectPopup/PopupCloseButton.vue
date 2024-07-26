<template>
  <div class="popup-close-button">
    <button @click="closePopup">닫기</button>
  </div>
</template>

<script setup>

function closePopup() {
  // 부모 창이 있는지 확인
  if (window.opener) {
    // 부모 창에 메시지 보내기
    window.opener.postMessage('refreshPage', '*');
  }
  // 팝업 창 닫기
  window.close();
}

</script>

<style scoped>
@import '@/assets/css/pretendard.css';

.popup-close-button {
  text-align: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px; /* 패딩 조정 */
  border: none; /* 테두리 제거 */
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #2484C6; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색 */
  cursor: pointer;
  font-size: 16px; /* 폰트 크기 조정 */
  font-family: 'Pretendard-SemiBold', sans-serif;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #1e6fa1; /* 호버 시 버튼 배경색 */
  transform: translateY(-2px); /* 호버 시 버튼 이동 효과 */
}

button:active {
  background-color: #195a7e; /* 클릭 시 버튼 배경색 */
  transform: translateY(0); /* 클릭 시 버튼 이동 효과 제거 */
}
</style>