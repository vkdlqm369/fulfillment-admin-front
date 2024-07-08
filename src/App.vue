<template>
  <v-app>
    <v-main class="main-background">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 전역 스타일 */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff; /* 배경색을 흰색으로 설정 */
}

.main-background {
  background-color: #ffffff; /* v-main의 배경색을 흰색으로 설정 */
  min-height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
}
</style>
