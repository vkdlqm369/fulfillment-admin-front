<template>
  <div :class="['content-wrapper', { 'popup-active': isPopupRoute }]">
    <Header v-if="!isPopupRoute" />
    <NavigationBar
      v-if="!isPopupRoute"
      @openPopup="openPopup"
      @refreshPage="handleRefreshPage"
    />
    <NewTable
      v-if="!isPopupRoute"
      :groupedData="groupedData"
      :totalPages="totalPages"
      :currentPage="currentPage"
    />
    <div class="footer-pagination-wrapper" v-if="!isPopupRoute">
      <div class="pagination-wrapper">
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChanged="handlePageChange"
        />
      </div>
      <div class="footer-wrapper">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import NavigationBar from "./NavigationBar.vue";
import NewTable from "./NewTable.vue";
import Footer from "./Footer.vue";
import Pagination from "./Pagination.vue";
import axios from "axios";

export default {
  name: "OrderCollect",
  components: {
    
    NavigationBar,
    NewTable,
    Pagination,
    Footer,
  },
  data() {
    return {
      orders: [],
      groupedData: [],
      totalPages: 1,
      currentPage: 1,
    };
  },
  methods: {
    openPopup(orders) {
    },
    isPopup() {
      return window.opener !== null && !window.opener.closed;
    },
    async fetchTableData(page = 1) {
      try {
        const url = "/api/table";
        const params = { currentPage: page - 1 };

        this.currentPage = page;
        const response = await axios.get(url, { params });
        console.log("Response data:", response.data);

        this.$nextTick(() => {
          this.groupedData = response.data.orders;
          this.totalPages = response.data.totalPages || 1;
        });

        console.log("Updated groupedData:", this.groupedData);
        console.log("Updated totalPages:", this.totalPages);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    },
    handlePageChange(page) {
      console.log("Page changed:", page);
      this.fetchTableData(page);
    },
    handleRefreshPage() {
      console.log("Refreshing page");
      this.fetchTableData(1);
    },
    handlePopupMessage(event) {
      if (event.data === 'refreshPage') {
        this.handleRefreshPage();
      }
    }
  },
  created() {
    if (!this.isPopup()) {
      this.fetchTableData();
    }
    window.addEventListener('message', this.handlePopupMessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handlePopupMessage);
  },
  computed: {
    isPopupRoute() {
      const popupRoutes = ["OrderCollectPopup"];
      return popupRoutes.includes(this.$route.name);
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-pagination-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.pagination-wrapper {
  text-align: center;
  padding: 10px 0;
}

.footer-wrapper {
  margin-top: auto;
}

.popup-content {
  justify-content: flex-start;
  padding: 40px;
}

.popup-active {
  flex: none;
}
</style>
