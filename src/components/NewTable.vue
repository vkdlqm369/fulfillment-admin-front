<template>
  <table border="1">
    <thead>
      <tr>
        <th>쇼핑몰주문번호</th>
        <th>주문순번</th>
        <th>수집상품명</th>
        <th>수집옵션명</th>
        <th>수취인명</th>
        <th>수취인주소</th>
        <th>수취인연락처</th>
        <th>수집일시</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(group, ordNo) in groupedData" :key="ordNo">
        <template v-for="(item, index) in group" :key="item.ordPrdNo">
          <tr>
            <td v-if="index === 0" :rowspan="group.length">{{ item.ordNo }}</td>
            <td>{{ item.ordPrdNo }}</td>
            <td>{{ item.prdNm }}</td>
            <td>{{ item.optVal }}</td>
            <td>{{ item.rcvrNm }}</td>
            <td>{{ getAddress(item) }}</td>
            <td>{{ item.rcvrMphnNo }}</td>
            <td>{{ item.ordDttm }}</td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script>
import { rawData } from "../assets/rawData";

export default {
  data() {
    return {
      groupedData: this.groupByOrderNo(rawData)
    };
  },
   methods: {
    groupByOrderNo(data) {
      return data.reduce((acc, item) => {
        if (!acc[item.ordNo]) {
          acc[item.ordNo] = [];
        }
        acc[item.ordNo].push(item);
        return acc;
      }, {});
    },
    getAddress(item) {
      return `${item.rcvrBaseAddr}, ${item.rcvrDtlsAddr}`;
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
}
</style>
