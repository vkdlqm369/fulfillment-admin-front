<template>
  <v-app>
    <v-main class="main-background">
      <Header v-if="showHeader" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import { useRoute } from 'vue-router';
import { computed } from 'vue'; 

export default {
  name: "App",
  components: {
    Header
  },
  setup() {
    const route = useRoute();
    // 현재 경로가 '/ordercollectpopup'인지 확인
    const showHeader = computed(() => route.path !== '/ordercollectpopup');
    
    return {
      showHeader
    };
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
