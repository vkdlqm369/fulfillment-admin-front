<template>
  <v-app>
    <v-main class="main-background">
      <Header v-if="!isPopupRouteApp" />
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
  },
  computed: {
    isPopupRouteApp() {
      const popupRoutes = ["OrderCollectPopup"]; // 팝업 창에서만 노출할 라우트 이름
      return popupRoutes.includes(this.$route.name);
    },
  },
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
