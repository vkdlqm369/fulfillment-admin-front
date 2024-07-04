<template>
  <a-table :columns="columns" :data-source="data" @change="onChange"></a-table>
</template>
<script setup>

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
    align: 'center',
    width: '5%',
  },
  {
    title: '쇼핑몰주문번호',
    dataIndex: 'ordNo',
    sorter: (a, b) => a.ordNo - b.ordNo,
    align: 'center',
    width: '10%',
  },
  {
    title: '주문순번',
    dataIndex: 'ordPrdNo',
    align: 'center',
    width: '5%',
  },
    {
    title: '수집상품명',
    dataIndex: 'prdNm',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '20%',
    align: 'center',
  },
  {
    title: '수집옵션명',
    dataIndex: 'optVal',
    align: 'center',
    width: '10%',
  },
  {
    title: '수취인명',
    dataIndex: 'rcvrNm',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '10%',
    align: 'center',
  },
{
    title: '수취인주소',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: (input, filter) => filter.value.indexOf(input) > -1,
    width: '20%',
    align: 'center',
  },
  {
    title: '수취인연락처',
    dataIndex: 'rcvrMphnNo',
    align: 'center',
    width: '10%',
  },
  {
    title: '수집일시',
    dataIndex: 'ordDttm',
    align: 'center',
    width: '10%',
  },
];

const rawData = [
  {
    key: '1',
    ordNo: 202407040001,
    ordPrdNo: 1,
    prdNm: '센시안 힐링테라피 쿨링패치',
    optVal : '옵션2',
    rcvrNm: 'John Brown',
    rcvrBaseAddr: '서울 금천구 가산디지털2로 108 (뉴티캐슬)',
    rcvrDtlsAddr: '405호',
    rcvrMphnNo: '010-1234-5678',
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    key: '2',
    ordNo: 202407040001,
    ordPrdNo: 2,
    prdNm: '다크비어 폼 트리트먼트',
    optVal : '옵션1',
    rcvrNm: 'Jim Green',
    rcvrBaseAddr: '경기 안산시 상록구 한양대학로 55',
    rcvrDtlsAddr: '제4공학관 1층 Smashroom',
    rcvrMphnNo: '010-3333-5678',
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    key: '3',
    ordNo: 202407040002,
    ordPrdNo: 1,
    prdNm: '뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g',
    optVal : '옵션2',
    rcvrNm: 'Joe Black',
    rcvrBaseAddr: '경기 성남시 수정구 금토로 69',
    rcvrDtlsAddr: '8층 사방넷연동개발팀',
    rcvrMphnNo: '010-1234-4312',
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    key: '4',
    ordNo: 202407040003,
    ordPrdNo: 1,
    prdNm: '로지나잇 리페어 앰플 트리트먼트',
    rcvrNm: 'Jim Red',
    optVal : '옵션1',
    rcvrBaseAddr: '경기 안산시 상록구 한양대학로 55',
    rcvrDtlsAddr: '제1공학관 305호',
    rcvrMphnNo: '010-1234-4893',
    ordDttm: "2024/07/04 11:57:40",
  },
];


const data = rawData.map(item => ({
  ...item,
  address: `${item.rcvrBaseAddr} ${item.rcvrDtlsAddr}`,
}));

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

</script>