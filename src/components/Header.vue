<template>
  <div class="header">
    <!--상단 헤드 영역-->
    <h4 class="header-text">타다닥 주문수집</h4>
    <p>
      <router-link to="/">메인 페이지</router-link>
      <router-link to="/ai-customer-analytics">AI 주문 분석</router-link>
    </p>

    <div class="header-buttons">
      <button @click="goToMainPage">메인 페이지</button>
      <button @click="goToAICustomerAnalytics">AI 주문 분석</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goToMainPage() {
      this.$router.push('/');
    },
    goToAICustomerAnalytics() {
      this.$router.push('/ai-customer-analytics');
    }
  }
};
</script>

<style scoped>
.header {
  padding: 10px 20px;
  background-color: #2c3e50;
  margin-bottom: 13px;
  border-radius: 5px;
  border: 2px solid #000;
}

.header-text {
  color: white;
  margin: 0;
  text-align: left;
}

.header-buttons {
  margin-top: 10px;
}

.header-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.header-buttons button:hover {
  background-color: #2980b9;
}
</style>
