<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <Header />
        <NavigationBar @openPopup="openPopup" @refreshPage="handleRefreshPage" />
        <NewTable
          :groupedData="groupedData"
          :totalPages="totalPages"
          :currentPage="currentPage"
          @pageChanged="handlePageChange"
        />
        <div class="footer-wrapper">
          <Footer />
        </div>
        <OrderCollectPopup :orders="orders" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import NavigationBar from "./components/NavigationBar.vue";
import NewTable from "./components/NewTable.vue";
import Footer from "./components/Footer.vue";
import OrderCollectPopup from "./components/OrderCollectPopup.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    NavigationBar,
    NewTable,
    Footer,
    OrderCollectPopup,
  },
  data() {
    return {
      orders: [],
      groupedData: [],
      totalPages: 1,
      currentPage: 1
    };
  },
  methods: {
    openPopup(orders) {
      this.orders = orders;
    },
    async fetchTableData(page = 1) {
      const url = "/api/table";
      const params = { currentPage: page - 1 }; // API의 currentPage는 0-based index

      this.currentPage = page; // 업데이트된 페이지 번호를 설정합니다.
      const response = await axios.get(url, { params });
      console.log('Response data:', response.data);
      this.groupedData = response.data.orders;
      this.totalPages = response.data.totalPages || 1;
      console.log('Updated groupedData:', this.groupedData);
      console.log('Updated totalPages:', this.totalPages);
    
    },
    handlePageChange(page) {
      console.log('Page changed:', page);
      this.fetchTableData(page);
    },
    handleRefreshPage() {
      console.log('Refreshing page');
      this.fetchTableData(1);
    }
  },
  created() {
    this.fetchTableData();
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

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 공간을 위아래로 나눔 */
}

.footer-wrapper {
  margin-top: auto; /* footer를 페이지 하단에 고정 */
}
</style>
