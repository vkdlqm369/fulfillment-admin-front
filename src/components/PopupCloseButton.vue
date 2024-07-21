<template>
    <div class="popup-close-button">
      <button @click="$emit('close')">닫기</button>
    </div>
  </template>
  
  <style scoped>
  .popup-close-button {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  