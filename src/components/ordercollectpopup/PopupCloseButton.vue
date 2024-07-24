<template>
  <div class="popup-close-button">
    <button @click="closePopup">닫기</button>
  </div>
</template>

<script setup>

function closePopup() {
  window.close();
}
</script>

<style scoped>
.popup-close-button {
  text-align: center;
  margin-top: 20px;
}

button {
  padding: 5px 15px;
  border: 2px solid #000; /* 테두리 추가 */
  border-radius: 5px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #f0f0f0;
}
</style>