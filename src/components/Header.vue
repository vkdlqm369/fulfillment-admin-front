<template>
  <div class="header">
    <!-- 상단 헤드 영역 -->
    <div class="header-left">
      <img
        src="/src/assets/sabangnet_logo.png"
        alt="Sabangnet Logo"
        class="header-logo"
      />
      <h4 class="header-text">타다닥 주문수집</h4>
    </div>
    <div class="header-buttons">
      <button @click="goToMainPage">메인 페이지</button>
      <button @click="goToAICustomerAnalytics">AI 주문 분석</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoading = ref(false);


const goToMainPage = () => {
  router.push("/");
};

const goToAICustomerAnalytics = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("/api/CustomersAiAnalysis");
    // 데이터를 세션 스토리지에 저장
    sessionStorage.setItem('customers', JSON.stringify(response.data.orders));
    // 데이터 로딩이 완료되면 페이지로 이동
    router.push("/ai-customer-analytics");
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.header {
  padding: 15px 20px;
  background-color: #ffffff;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-logo {
  width: 1.5em; 
  height: 1.5em; 
  margin-right: 10px;
}

.header-text {
  color: #2484c6;
  margin: 0;
  font-size: 1.5em;
  font-family: "Pretendard-SemiBold", sans-serif;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #2484c6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-family: "Pretendard-SemiBold", sans-serif;
}

.header-buttons button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.header-buttons button:active {
  background-color: #1f6391;
}
</style>
