<template>
  <div>
    <template v-if="groupedData.length === 0">
      <p class="no-data-message">해당 기간의 주문 내역 데이터가 존재하지 않습니다.</p>
    </template>
    <template v-else>
      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th class="order-sequence">No.</th>
              <th class="order-number">쇼핑몰주문번호</th>
              <th class="order-product-number">주문순번</th>
              <th class="product-name">수집상품명</th>
              <th class="option-name">수집옵션명</th>
              <th class="receiver-name">수취인명</th>
              <th class="receiver-address">수취인주소</th>
              <th class="receiver-contact">수취인연락처</th>
              <th class="collection-time">수집일시</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(group, ordNo) in groupedData" :key="ordNo">
              <tr v-if="group.ordersDetail.length" class="group-separator">
                <td colspan="9"></td>
              </tr>
              <template v-for="item in group.ordersDetail" :key="item.ordPrdNo">
                <tr :class="{ 'hover': hoverOrder === ordNo }" @mouseover="hoverOrder = ordNo" @mouseout="hoverOrder = null">
                  <td class="order-sequence">{{ item.index }}</td>
                  <td v-if="item.rowspan > 0" :rowspan="item.rowspan" class="order-number">{{ group.ordNo }}</td>
                  <td class="order-product-number">{{ item.ordPrdNo }}</td>
                  <td class="product-name">{{ item.prdNm }}</td>
                  <td class="option-name">{{ item.optVal }}</td>
                  <td class="receiver-name">{{ group.rcvrNm }}</td>
                  <td class="receiver-address">{{ group.rcvrAddr }}</td>
                  <td class="receiver-contact">{{ formatPhoneNumber(group.rcvrMphnNo) }}</td>
                  <td class="collection-time">{{ formatordCollectDttm(group.ordCollectDttm) }}</td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  groupedData: {
    type: Array,
    required: true
  }
});

const hoverOrder = ref(null);

function formatordCollectDttm(ordCollectDttm) {
  return ordCollectDttm.replace('T', ' ');
}

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); //전화번호 형식 xxx-xxxx-xxxx로 변환
}

</script>

<style scoped>
@import '@/assets/css/pretendard.css';

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: 'Pretendard-Regular', sans-serif;
  cursor: default;
  text-align: center; /* 모든 요소 가운데 정렬 */
}



.modern-table th,
.modern-table td {
  padding: 16px;
  white-space: nowrap;
  transition: background-color 0.3s ease, color 0.3s ease;
  
}

.modern-table thead {
  background-color: #2484C6;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Pretendard-Semibold', sans-serif;
  
}

.modern-table:hover thead  {
  cursor: default; /* 호버 시 커서가 포인터로 변경 */
}

.modern-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.modern-table tbody tr:last-child {
  border-bottom: none;
}

.modern-table td {
  background-color: #ffffff;
}

.modern-table tr.hover td {
  background-color: #f9f9f9;
  color: #000000;
}

.modern-table td.order-sequence,
.modern-table td.order-number {
  border-right: 1px solid #b6bfc5; /* No. 열과 주문번호 열에 구분선 추가 */
}

.group-separator td {
  border-top: 1px solid #b6bfc5; /* 그룹 사이에 구분선 추가 */
  padding: 0;
  height: 0;
}

.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #6c757d;
  font-family: 'Pretendard', sans-serif;
}

/* 반응형 디자인 */
@media screen and (max-width: 768px) {
  .modern-table th,
  .modern-table td {
    padding: 12px;
    font-size: 0.9em;
  }

  .modern-table th.order-sequence,
  .modern-table td.order-sequence,
  .modern-table th.order-number,
  .modern-table td.order-number {
    display: none;
  }
}
</style>