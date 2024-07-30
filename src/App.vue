<template>
  <v-app>
    <v-main class="main-background">
      <Header v-if="!isPopupRouteApp" />
      <router-view></router-view>
      <Footer v-if="!isPopupRouteApp && isAiRouteApp"/>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

const popupRoutes = ["OrderCollectPopup"]; // 팝업 창에서만 노출할 라우트 이름
const isPopupRouteApp = computed(() => popupRoutes.includes(route.name));
const AiRoutes = ["AiCustomerAnalytics"]; // 
const isAiRouteApp = computed(() => AiRoutes.includes(route.name));
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
}

footer {
  margin-top: auto;
}

.main-background {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
