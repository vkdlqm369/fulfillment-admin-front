<template>
  <div class="popup-container">
    <PopupHeader />
    <div class="popup-content">
      <PopupBody :orders="orders" @loading-complete="loadingCompleteHandler" />
    </div>
    <div class="popup-footer">
      <PopupResults :successCount="successCount" :failureCount="failureCount" :totalCount="totalCount" :loadingComplete="loadingComplete" />
      <PopupCloseButton />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import PopupHeader from './ordercollectpopup/PopupHeader.vue';
import PopupBody from './ordercollectpopup/PopupBody.vue';
import PopupResults from './ordercollectpopup/PopupResults.vue';
import PopupCloseButton from './ordercollectpopup/PopupCloseButton.vue';

const orders = ref([]);
const successCount = ref(0);
const failureCount = ref(0);
const totalCount = ref(0);
const loadingComplete = ref(false);

// 메시지를 수신했을 때 실행되는 함수 (데이터 수신)
function handleMessage(event) {
  const data = JSON.parse(event.data); // 수신한 메시지를 JSON 형식으로 파싱
  orders.value = data.orderResults; // 파싱한 데이터를 orders 변수에 저장
  successCount.value = data.successCount;
  failureCount.value = data.failCount;
  totalCount.value = data.totalCount;
}

// 컴포넌트가 마운트될 때 (화면에 나타날 때) 실행
onMounted(() => {
  // 'message' 이벤트 리스너를 등록하여 부모 창에서 오는 메시지를 수신할 준비를 합니다.
  window.addEventListener('message', handleMessage);
});

// 컴포넌트가 언마운트될 때 (화면에서 사라질 때) 실행
onBeforeUnmount(() => {
  // 'message' 이벤트 리스너를 제거하여 더 이상 메시지를 수신하지 않도록 합니다.
  window.removeEventListener('message', handleMessage);
});

function loadingCompleteHandler() {
  loadingComplete.value = true;
}

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
