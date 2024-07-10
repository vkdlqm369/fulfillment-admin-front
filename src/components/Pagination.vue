<template>
  <div>
    <v-pagination
      class="pagination-margin"
      v-model="currentPage"
      :length="10"
      :total-visible="6"
    ></v-pagination>
    <span>Current Page: {{ currentPage }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 초기 페이지 설정
    };
  },
  
};
</script>
