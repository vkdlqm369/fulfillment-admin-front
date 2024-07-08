<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <TopButton />
        <Footer />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TopButton from './components/TopButton.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    TopButton,
    Footer
  }
}
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
  justify-content: space-between; /* 공간을 위아래로 나눔 */
}
</style>
