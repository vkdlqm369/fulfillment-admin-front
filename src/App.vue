<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <Header />
        <NavigationBar @openPopup="openPopup" />
        <Pagination />
        <Footer />
        <OrderCollectPopup :orders="orders" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import NavigationBar from './components/NavigationBar.vue';
import NewTable from './components/NewTable.vue';
import Pagination from './components/Pagination.vue';
import Footer from './components/Footer.vue';
import OrderCollectPopup from './components/OrderCollectPopup.vue';

export default {
  name: 'App',
  components: {
    Header,
    NavigationBar,
    NewTable,
    Pagination,
    Footer,
    OrderCollectPopup,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    openPopup(orders) {
      this.orders = orders;
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
  justify-content: space-between; /* 공간을 위아래로 나눔 */
}
</style>
