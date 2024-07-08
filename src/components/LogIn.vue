<template>
    <div class="home">
      <h1>관리자 페이지</h1>
      <button @click="goToTopButton">관리자 인증하기</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    methods: {
      goToTopButton() {
        this.$router.push('/topbutton');
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  