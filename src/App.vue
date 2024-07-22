<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <Header />
        <NavigationBar @openPopup="openPopup" />
        <Pagination />
        <Footer />
        <OrderCollectPopup v-if="showPopup" :orders="orders" @close="closePopup" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import NavigationBar from './components/NavigationBar.vue';
import Pagination from './components/Pagination.vue';
import Footer from './components/Footer.vue';
import OrderCollectPopup from './components/OrderCollectPopup.vue';

export default {
  name: 'App',
  components: {
    Header,
    NavigationBar,
    Pagination,
    Footer,
    OrderCollectPopup,
  },
  data() {
    return {
      orders: [],
      showPopup: false,
    };
  },
  methods: {
    openPopup(orders) {
      this.orders = orders;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
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
