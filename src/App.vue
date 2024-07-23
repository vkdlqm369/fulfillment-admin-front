<template>
  <v-app>
    <v-main class="main-background">
      <div class="content-wrapper">
        <Header />
        <!-- 헤더 컴포넌트 삽입 -->
        <NavigationBar
          @openPopup="openPopup"
          @refreshPage="handleRefreshPage"
        />
        <!-- 네비게이션 바 컴포넌트, 팝업 열기와 새로고침 이벤트 핸들러 바인딩 -->
        <NewTable
          :groupedData="groupedData"
          :totalPages="totalPages"
          :currentPage="currentPage"
        />
        <div class="pagination-wrapper">
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChanged="handlePageChange"
          />
          <!-- Pagination 컴포넌트에서 발생한 pageChanged 이벤트를 handlePageChange 메서드로 처리 + fetchTableData 메서드를 호출 -->
        </div>
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
import Pagination from "./components/Pagination.vue";
import OrderCollectPopup from "./components/OrderCollectPopup.vue";
import axios from "axios";

export default {
  name: "App",
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
      orders: [], // 주문 데이터 배열
      groupedData: [], // 테이블에 표시될 데이터 배열
      totalPages: 1, // 총 페이지 수 (기본 1)
      currentPage: 1, // 현재 페이지 번호 (기본 1)
    };
  },
  methods: {
    openPopup(orders) {
      this.orders = orders;
    },

    // 테이블 최신화 함수
    async fetchTableData(page = 1) {
      const url = "/api/table"; // 데이터를 가져올 API URL
      const params = { currentPage: page - 1 }; // API의 페이지 번호는 0부터 시작하므로 -1

      this.currentPage = page; // 현재 페이지 번호 업데이트
      const response = await axios.get(url, { params }); // Axios를 사용해 GET 요청 보내기
      console.log("Response data:", response.data); // 응답 데이터 콘솔 출력

      this.$nextTick(() => {
        this.groupedData = response.data.orders;
        this.totalPages = response.data.totalPages || 1;
      });

      console.log("Updated groupedData:", this.groupedData); // 업데이트된 데이터 콘솔에 출력
      console.log("Updated totalPages:", this.totalPages); // 업데이트된 총 페이지 수 콘솔에 출력
    },

    handlePageChange(page) {
      console.log("Page changed:", page); // 페이지 변경될 때 마다 콘솔에 출력
      this.fetchTableData(page); // 해당 페이지 데이터 가져옴
    },

    handleRefreshPage() {
      console.log("Refreshing page"); // 새로고침 할 때 마다 콘솔에 출력
      this.fetchTableData(1); // 첫 페이지 데이터 가져옴
    },
  },
  created() {
    this.fetchTableData(); // 새로 로딩시, 첫 페이지 데이터 가져옴
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

.pagination-wrapper {
  position: fixed;
  bottom: 75px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
}
</style>
