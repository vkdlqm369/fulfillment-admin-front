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
</style>