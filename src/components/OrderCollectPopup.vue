<template>
  <div>
    <PopupHeader />
    <PopupBody />
    <PopupResults :orders="orders" :successCount="successCount" :failureCount="failureCount" :totalCount="totalCount"/>
    <PopupCloseButton @click="sendMsgToParent" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PopupHeader from './ordercollectpopup/PopupHeader.vue';
import PopupBody from './ordercollectpopup/PopupBody.vue';
import PopupResults from './ordercollectpopup/PopupResults.vue';
import PopupCloseButton from './ordercollectpopup/PopupCloseButton.vue';

const orders = ref([]);
const successCount = ref(0);
const failureCount = ref(0);
const totalCount = ref(0);

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('popupOrderData'));
  if (data) {
    orders.value = data.orderResults;
    successCount.value = data.successCount;
    failureCount.value = data.failCount;
    totalCount.value = data.totalCount;
    // 데이터를 사용한 후 localStorage에서 삭제
    localStorage.removeItem('popupOrderData');
  }
});
</script>