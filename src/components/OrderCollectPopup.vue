<template>
  <div>
    <PopupHeader />
    <PopupBody :orders="orders" />
    <PopupResults :orders="orders" :successCount="successCount" :failureCount="failureCount" />
    <PopupCloseButton @close="closePopup" />
  </div>
</template>

<script setup>
import PopupHeader from './OrderCollectPopup/PopupHeader.vue';
import PopupBody from './OrderCollectPopup/PopupBody.vue';
import PopupResults from './OrderCollectPopup/PopupResults.vue';
import PopupCloseButton from './OrderCollectPopup/PopupCloseButton.vue';
import { ref, computed } from 'vue';

const orders = ref([
  { id: 1, status: '성공' },
  { id: 2, status: '실패' },
  { id: 3, status: '성공' },
]); // 임시 데이터

const successCount = computed(() => orders.value.filter(order => order.status === '성공').length);
const failureCount = computed(() => orders.value.filter(order => order.status === '실패').length);

function closePopup() {
  window.close();
}
</script>
