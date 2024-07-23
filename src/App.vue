<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <Header v-if="!isPopupRoute" />
        <NavigationBar v-if="!isPopupRoute" @openPopup="openPopup" />
        <Pagination v-if="!isPopupRoute" />
        <Footer v-if="!isPopupRoute" />
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import NavigationBar from './components/NavigationBar.vue';
import Pagination from './components/Pagination.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    NavigationBar,
    Pagination,
    Footer
  },
  computed: {
    isPopupRoute() {
      const popupRoutes = ['OrderCollectPopup']; // 팝업 창에서만 노출할 라우트 이름
      return popupRoutes.includes(this.$route.name);
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
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

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}
</style>
