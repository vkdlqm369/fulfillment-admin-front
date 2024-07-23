<template>
  <div>
    <PopupHeader />
    <PopupBody  />
    <PopupResults :orders="orders" :successCount="successCount" :failureCount="failureCount" />
    <PopupCloseButton @close="closePopup" />
  </div>
</template>

<script setup>
import PopupHeader from './ordercollectpopup/PopupHeader.vue';
import PopupBody from './ordercollectpopup/PopupBody.vue';
import PopupResults from './ordercollectpopup/PopupResults.vue';
import PopupCloseButton from './ordercollectpopup/PopupCloseButton.vue';
import { ref, computed, onMounted } from 'vue';

// 임시 데이터
const orders = ref([]); 

const successCount = computed(() => orders.value.filter(order => order.status === '성공').length);
const failureCount = computed(() => orders.value.filter(order => order.status === '실패').length);

</script>
