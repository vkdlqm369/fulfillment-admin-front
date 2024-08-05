<template>
  <div :class="['content-wrapper', { 'popup-active': isPopupRoute }]">
    <NavigationBar
      v-if="!isPopupRoute"
      @refreshPage="handleRefreshPage"
    />
    <NewTable
      v-if="!isPopupRoute"
      :groupedData="groupedData"
      :totalPages="totalPages"
      :currentPage="currentPage"
    />
    </div>
    <div class="footer-pagination-wrapper" v-if="!isPopupRoute">
      <div class="pagination-wrapper">
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChanged="handlePageChange"
        />
        <Footer />
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import NavigationBar from "./ordercollect/NavigationBar.vue";
import NewTable from "./ordercollect/NewTable.vue";
import Pagination from "./ordercollect/Pagination.vue";
import Footer from "./Footer.vue";
import axios from "axios";

const route = useRoute();

const orders = ref([]);
const groupedData = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);

const isPopup = () => {
  return window.opener !== null && !window.opener.closed;
};

const fetchTableData = async (page = 1) => {
  try {
    const url = "/api/table";
    const params = { currentPage: page - 1 };

    currentPage.value = page;
    const response = await axios.get(url, { params });
    console.log("Response data:", response.data);

    nextTick(() => {
      groupedData.value = response.data.orders;
      totalPages.value = response.data.totalPages || 1;
    });

    console.log("Updated groupedData:", groupedData.value);
    console.log("Updated totalPages:", totalPages.value);
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
};

const handlePageChange = (page) => {
  console.log("Page changed:", page);
  fetchTableData(page);
};

const handleRefreshPage = () => {
  console.log("Refreshing page");
  fetchTableData(1);
};

const handlePopupMessage = (event) => {
  if (event.data === 'refreshPage') {
    handleRefreshPage();
  }
};

onMounted(() => {
  if (!isPopup()) {
    fetchTableData();
  }
  window.addEventListener('message', handlePopupMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handlePopupMessage);
});

const popupRoutes = ["OrderCollectPopup"];
const isPopupRoute = computed(() => popupRoutes.includes(route.name));
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 80vh; /* Ensure it takes the full height of the viewport */
}

.footer-pagination-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white; /* Adjust background color if needed */
}

.pagination-wrapper {
  text-align: center;
}

.popup-content {
  justify-content: flex-start;
}

.popup-active {
  flex: none;
}
</style>

