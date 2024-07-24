<template>
  <div class="popup-container">
    <PopupHeader />
    <div class="popup-content">
      <PopupBody :orders="orders" :updateCounts="updateCounts" />
    </div>
    <div class="popup-footer">
      <PopupResults :successCount="successCount" :failureCount="failureCount" :totalCount="totalCount"/>
      <PopupCloseButton />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PopupHeader from './ordercollectpopup/PopupHeader.vue';
import PopupBody from './ordercollectpopup/PopupBody.vue';
import PopupResults from './ordercollectpopup/PopupResults.vue';
import PopupCloseButton from './ordercollectpopup/PopupCloseButton.vue';

const orders = ref([]);
const successCount = ref(0);
const failureCount = ref(0);
const totalCount = ref(0);

function handleMessage(event) {
  console.log("Message received:", event.data);
  const data = JSON.parse(event.data);
  console.log("Parsed data:", data);
  orders.value = data.orderResults;
}

function updateCounts(isSuccess) {
  if (isSuccess) {
    successCount.value++;
  } else {
    failureCount.value++;
  }
  totalCount.value++;
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<style scoped>
.popup-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.popup-content {
  flex: 1;
  overflow-y: auto;
}

.popup-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
