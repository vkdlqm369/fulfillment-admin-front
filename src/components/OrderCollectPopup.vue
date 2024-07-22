<script setup>
const props = defineProps({
  orders: {
    type: Array,
    required: true,
  }
});

watch(() => props.orders, (newOrders) => {
  if (newOrders.length > 0) {
    openPopupWindow(newOrders);
  }
});

function openPopupWindow(orders) {
  const popupWindow = window.open('', '_blank', 'width=600,height=400');
  popupWindow.document.write(`
    <html>
      <head>
        <title>사방넷 리테일즈</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .success { color: green; }
          .failure { color: red; }
          .popup-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .popup-body { margin-top: 10px; }
          .popup-results { margin-top: 20px; text-align: center; }
          .popup-close-button { text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="popup-header">
          <h4>주문 수집 결과</h4>
        </div>
        <div class="popup-body">
          ${orders.map((order, index) => `
            <div>
              <span>${index + 1}번째 주문 ${order.id}</span>
              <span class="${order.status === '성공' ? 'success' : 'failure'}">${order.status}</span>
            </div>
          `).join('')}
        </div>
        <div class="popup-results">
          <p>총 ${orders.length}건이 처리되었습니다.</p>
        </div>
        <div class="popup-close-button">
          <button onclick="window.close()">닫기</button>
        </div>
      </body>
    </html>
  `);
}
</script>

<template>
  <!-- 팝업 창 관리 -->
  <div></div>
</template>

<style scoped>
/* 스타일 추가 */
</style>
