<template>
  <div>
    <template v-if="groupedData.length === 0">
      <p class="no-data-message">해당 기간의 주문 내역 데이터가 존재하지 않습니다.</p>
    </template>
    <template v-else>
      <table border="1">
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
            <template v-for="item in group.ordersDetail" :key="item.ordPrdNo">
              <tr>
                <td class="order-sequence">{{ item.index }}</td>
                <td v-if="item.rowspan > 0" :rowspan="item.rowspan" class="order-number">{{ group.ordNo }}</td>
                <td class="order-product-number">{{ item.ordPrdNo }}</td>
                <td class="product-name">{{ item.prdNm }}</td>
                <td class="option-name">{{ item.optVal }}</td>
                <td class="receiver-name">{{ group.rcvrNm }}</td>
                <td class="receiver-address">{{ group.rcvrAddr }}</td>
                <td class="receiver-contact">{{ group.rcvrMphnNo }}</td>
                <td class="collection-time">{{ group.ordCollectDttm }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  props: { 
    groupedData: { 
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 30px;
}

th,
td {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
}

.order-sequence {
  width: 3%;
}

.order-number {
  width: 8%;
}

.order-product-number {
  width: 5%;
}

.product-name {
  width: 25%;
}

.option-name {
  width: 8%;
}

.receiver-name {
  width: 7%;
}

.receiver-address {
  width: 27%;
}

.receiver-contact {
  width: 8%;
}

.collection-time {
  width: 9%;
}

.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #777;
}
</style>
