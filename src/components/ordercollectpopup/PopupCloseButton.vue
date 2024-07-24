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
.popup-close-button {
  text-align: center;
  margin-top: 20px;
}
</style>