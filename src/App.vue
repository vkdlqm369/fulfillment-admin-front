<template>
  <v-app>
    <v-main class="main-background">
      <Header />
      <v-container>
        <router-link to="/">메인 페이지</router-link>
        <router-link to="/ai-customer-analytics">AI 주문 분석</router-link>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
}

.main-background {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
