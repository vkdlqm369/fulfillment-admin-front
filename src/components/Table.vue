<template>
  <!-- Antd 테이블 템플릿 사용 명시 -->
  <a-table
    :columns="columns"
    :data-source="indexData"
    :pagination="paginationConfig"
    @change="onChange"
  >
  </a-table>
</template>

<script setup>
//테이블 컬럼 불러오기
import { columns as getColumns } from "../assets/columns";
//더미데이터 불러오기
import { rawData as getrawData } from "../assets/rawData";

const columns = getColumns;
const rawData = getrawData;

// 기본 주소 + 상세 주소 같이 매핑
const data = rawData.map((item) => ({
  ...item,
  address: `${item.rcvrBaseAddr} ${item.rcvrDtlsAddr}`,
}));

// index 번호 같이 매핑
const indexData = data.map((item, index) => ({
  key: index + 1,
  ...item,
}));

// 로그 기록
function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

// 페이지네이션 설정
const paginationConfig = {
  position: ["bottomCenter"],
  pageSize: 10,
  showSizeChanger: false,
  onChange: (page, pageSize) => {
    console.log("Current Page:", page);
    rowSpanData = calculateRowSpan(
      data.slice((page - 1) * pageSize, page * pageSize)
    );
  },
};

const calculateRowSpan = (data) => {
  const rowSpanData = data.map((item, index) => {
    let rowSpan = 1;
    if (index === 0 || data[index].ordNo !== data[index - 1].ordNo) {
      for (let i = index + 1; i < data.length; i++) {
        if (data[index].ordNo === data[i].ordNo) {
          rowSpan++;
        } else {
          break;
        }
      }
    } else {
      rowSpan = 0;
    }
    return { ...item, rowSpan };
  });
  return rowSpanData;
};

// 초기 데이터로 rowSpanData 계산
let rowSpanData = calculateRowSpan(data);

// columns 배열에 계산된 customCell 추가
columns.forEach((column) => {
  if (column.dataIndex === "ordNo") {
    column.customCell = (_, index) => {
      return { rowSpan: rowSpanData[index].rowSpan };
    };
  }
});
</script>
