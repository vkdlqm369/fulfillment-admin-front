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

// 메시지를 수신했을 때 실행되는 함수 (데이터 수신)
function handleMessage(event) {
  console.log("Message received:", event.data);
  const data = JSON.parse(event.data); // 수신한 메시지를 JSON 형식으로 파싱
  console.log("Parsed data:", data);
  orders.value = data.orderResults; // 파싱한 데이터를 orders 변수에 저장
}

// 성공 여부를 동적으로 카운트하는 함수
function updateCounts(isSuccess) {
  if (isSuccess) {
    successCount.value++;
  } else {
    failureCount.value++;
  }
  totalCount.value++
}

// 컴포넌트가 마운트될 때 (화면에 나타날 때) 실행
onMounted(() => {
  // 'message' 이벤트 리스너를 등록하여 부모 창에서 오는 메시지를 수신할 준비
  window.addEventListener('message', handleMessage);
});

// 컴포넌트가 언마운트될 때 (화면에서 사라질 때) 실행
onBeforeUnmount(() => {
  // 'message' 이벤트 리스너를 제거하여 더 이상 메시지를 수신하지 않도록 합니다.
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
