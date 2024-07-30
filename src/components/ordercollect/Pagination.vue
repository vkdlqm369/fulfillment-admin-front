<template>
  <div>
    <v-pagination
      class="pagination-margin"
      :modelValue="currentPage"
      :length="totalPages"
      :total-visible="6"
      @update:modelValue="onPageChange"
    ></v-pagination>
  </div>
</template>

<script setup>

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['pageChanged']);

function onPageChange(page) {
  console.log('New page selected:', page);
  emit('pageChanged', page); // 페이지 네이션 버튼 누르면 현재 컴포넌트에서 pageChanged라는 이벤트를 발생 + 그 이벤트와 함께 page라는 값을 부모컴포넌트에 전달
}
</script>

<style scoped>

</style>
