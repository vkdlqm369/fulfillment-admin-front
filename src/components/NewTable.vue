<template>
  <div>
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
              <td>{{ item.index }}</td>
              <td v-if="item.rowspan > 0" :rowspan="item.rowspan">
                {{ group.ordNo }}
              </td>
              <td>{{ item.ordPrdNo }}</td>
              <td>{{ item.prdNm }}</td>
              <td>{{ item.optVal }}</td>
              <td>{{ group.rcvrNm }}</td>
              <td>{{ group.rcvrAddr }}</td>
              <td>{{ group.rcvrMphnNo }}</td>
              <td>{{ group.ordCollectDttm }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <div class="pagination-container">
      <v-pagination
        class="pagination-margin"
        :modelValue="currentPage"
        :length="totalPages"
        :total-visible="6"
        @update:modelValue="onPageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupedData: {
      type: Array,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    onPageChange(page) {
      console.log('New page selected:', page);
      this.$emit('pageChanged', page);
    }
  },
  watch: {
    groupedData(newVal) {
      console.log('New groupedData:', newVal);
    },
    totalPages(newVal) {
      console.log('New totalPages:', newVal);
    },
    currentPage(newVal) {
      console.log('New currentPage:', newVal);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 30px;
}
th,
td {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
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
.pagination-container {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}
</style>
