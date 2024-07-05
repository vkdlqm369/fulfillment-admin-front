<template>
  <!-- Antd 테이블 템플릿 사용 명시 -->
  <a-table
    :columns="columns"
    :data-source="indexData"
    :pagination="paginationConfig"
    @change="onChange"
  >
  <template #headerCell="{ column }">
      <template v-if="column.key === 'prdNm' || column.key === 'rcvrNm'">
        <a-input-search
          v-model:value="state.searchText"
          :placeholder="`Search ${column.title}`"
          @search="handleSearch(column.dataIndex)"
          style="margin-bottom: 8px; display: block"
        />
      </template>
    </template>
    <template #bodyCell="{ text, column }">
      <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <span v-else>{{ text }}</span>
    </template>
  </a-table>
</template>
<script setup>
// 테이블 컬럼 명시
const columns = [
  {
    // 인덱스
    title: "No.",
    dataIndex: "key",
    align: "center",
    width: "5%",
  },
  {
    // 쇼핑몰주문번호
    title: "쇼핑몰주문번호",
    dataIndex: "ordNo",
    align: "center",
    width: "10%",
    // 같은 주문번호끼리 셀 병합
    customCell: (_, index) => {
      return { rowSpan: rowSpanData[index].rowSpan };
    },
  },
  {
    // 주문순번
    title: "주문순번",
    dataIndex: "ordPrdNo",
    align: "center",
    width: "5%",
  },
  {
    // 수집상품명
    title: "수집상품명",
    dataIndex: "prdNm",
    // 상품명 필터
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.prdNm.toString().toLowerCase().includes(value.toLowerCase()),
    width: "20%",
    align: "center",
  },
  {
    title: "수집옵션명",
    dataIndex: "optVal",
    align: "center",
    width: "10%",
  },
  {
    title: "수취인명",
    dataIndex: "rcvrNm",

    width: "10%",
    align: "center",
  },
  {
    title: "수취인주소",
    dataIndex: "address",
        filters: [
          {
      text: "서울",
      value: "서울",
      children: [
        {
          text: "강남구",
          value: "강남구"
        },
        {
          text: "강동구",
          value: "강동구"
        },
        {
          text: "강북구",
          value: "강북구"
        },
        {
          text: "강서구",
          value: "강서구"
        },
        {
          text: "관악구",
          value: "관악구"
        },
        {
          text: "광진구",
          value: "광진구"
        },
        {
          text: "구로구",
          value: "구로구"
        },
        {
          text: "금천구",
          value: "금천구"
        },
        {
          text: "노원구",
          value: "노원구"
        },
        {
          text: "도봉구",
          value: "도봉구"
        },
        {
          text: "동대문구",
          value: "동대문구"
        },
        {
          text: "동작구",
          value: "동작구"
        },
        {
          text: "마포구",
          value: "마포구"
        },
        {
          text: "서대문구",
          value: "서대문구"
        },
        {
          text: "서초구",
          value: "서초구"
        },
        {
          text: "성동구",
          value: "성동구"
        },
        {
          text: "성북구",
          value: "성북구"
        },
        {
          text: "송파구",
          value: "송파구"
        },
        {
          text: "양천구",
          value: "양천구"
        },
        {
          text: "영등포구",
          value: "영등포구"
        },
        {
          text: "용산구",
          value: "용산구"
        },
        {
          text: "은평구",
          value: "은평구"
        },
        {
          text: "종로구",
          value: "종로구"
        },
        {
          text: "중구",
          value: "중구"
        },
        {
          text: "중랑구",
          value: "중랑구"
        }
      ]
    },
    {
      text: "인천",
      value: "인천",
      children: [
        {
          text: "중구",
          value: "중구"
        },
        {
          text: "동구",
          value: "동구"
        },
        {
          text: "미추홀구",
          value: "미추홀구"
        },
        {
          text: "연수구",
          value: "연수구"
        },
        {
          text: "남동구",
          value: "남동구"
        },
        {
          text: "부평구",
          value: "부평구"
        },
        {
          text: "계양구",
          value: "계양구"
        },
        {
          text: "서구",
          value: "서구"
        },
        {
          text: "강화군",
          value: "강화군"
        },
        {
          text: "옹진군",
          value: "옹진군"
        }
      ]
    },
    {
      text: "경기",
      value: "경기",
      children: [
        {
          text: "고양시",
          value: "고양시"
        },
        {
          text: "과천시",
          value: "과천시"
        },
        {
          text: "광명시",
          value: "광명시"
        },
        {
          text: "광주시",
          value: "광주시"
        },
        {
          text: "구리시",
          value: "구리시"
        },
        {
          text: "군포시",
          value: "군포시"
        },
        {
          text: "김포시",
          value: "김포시"
        },
        {
          text: "남양주시",
          value: "남양주시"
        },
        {
          text: "동두천시",
          value: "동두천시"
        },
        {
          text: "부천시",
          value: "부천시"
        },
        {
          text: "성남시",
          value: "성남시"
        },
        {
          text: "수원시",
          value: "수원시"
        },
        {
          text: "시흥시",
          value: "시흥시"
        },
        {
          text: "안산시",
          value: "안산시"
        },
        {
          text: "안성시",
          value: "안성시"
        },
        {
          text: "안양시",
          value: "안양시"
        },
        {
          text: "양주시",
          value: "양주시"
        },
        {
          text: "여주시",
          value: "여주시"
        },
        {
          text: "오산시",
          value: "오산시"
        },
        {
          text: "용인시",
          value: "용인시"
        },
        {
          text: "의왕시",
          value: "의왕시"
        },
        {
          text: "의정부시",
          value: "의정부시"
        },
        {
          text: "이천시",
          value: "이천시"
        },
        {
          text: "파주시",
          value: "파주시"
        },
        {
          text: "평택시",
          value: "평택시"
        },
        {
          text: "포천시",
          value: "포천시"
        },
        {
          text: "하남시",
          value: "하남시"
        },
        {
          text: "화성시",
          value: "화성시"
        },
        {
          text: "가평군",
          value: "가평군"
        },
        {
          text: "연천군",
          value: "연천군"
        },
        {
          text: "양평군",
          value: "양평군"
        }
      ]
    }
  ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "20%",
    align: "center",
  },
  {
    title: "수취인연락처",
    dataIndex: "rcvrMphnNo",
    align: "center",
    width: "10%",
  },
  {
    title: "수집일시",
    dataIndex: "ordDttm",
    align: "center",
    width: "10%",
  },
];

const rawData = [
  {
    ordNo: 202407040001,
    ordPrdNo: 1,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040001,
    ordPrdNo: 2,
    prdNm: "다크비어 폼 트리트먼트",
    optVal: "옵션1",
    rcvrNm: "Jim Green",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제4공학관 1층 Smashroom",
    rcvrMphnNo: "010-3333-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040002,
    ordPrdNo: 1,
    prdNm: "뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g",
    optVal: "옵션2",
    rcvrNm: "Joe Black",
    rcvrBaseAddr: "경기 성남시 수정구 금토로 69",
    rcvrDtlsAddr: "8층 사방넷연동개발팀",
    rcvrMphnNo: "010-1234-4312",
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    ordNo: 202407040003,
    ordPrdNo: 1,
    prdNm: "로지나잇 리페어 앰플 트리트먼트",
    rcvrNm: "Jim Red",
    optVal: "옵션1",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제1공학관 305호",
    rcvrMphnNo: "010-1234-4893",
    ordDttm: "2024/07/04 11:57:40",
  },
  {
    ordNo: 202407040003,
    ordPrdNo: 2,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040003,
    ordPrdNo: 3,
    prdNm: "다크비어 폼 트리트먼트",
    optVal: "옵션1",
    rcvrNm: "Jim Green",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제4공학관 1층 Smashroom",
    rcvrMphnNo: "010-3333-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040003,
    ordPrdNo: 4,
    prdNm: "뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g",
    optVal: "옵션2",
    rcvrNm: "Joe Black",
    rcvrBaseAddr: "경기 성남시 수정구 금토로 69",
    rcvrDtlsAddr: "8층 사방넷연동개발팀",
    rcvrMphnNo: "010-1234-4312",
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    ordNo: 202407040003,
    ordPrdNo: 5,
    prdNm: "로지나잇 리페어 앰플 트리트먼트",
    rcvrNm: "Jim Red",
    optVal: "옵션1",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제1공학관 305호",
    rcvrMphnNo: "010-1234-4893",
    ordDttm: "2024/07/04 11:57:40",
  },
  {
    ordNo: 202407040004,
    ordPrdNo: 1,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040004,
    ordPrdNo: 2,
    prdNm: "다크비어 폼 트리트먼트",
    optVal: "옵션1",
    rcvrNm: "Jim Green",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제4공학관 1층 Smashroom",
    rcvrMphnNo: "010-3333-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040004,
    ordPrdNo: 3,
    prdNm: "뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g",
    optVal: "옵션2",
    rcvrNm: "Joe Black",
    rcvrBaseAddr: "경기 성남시 수정구 금토로 69",
    rcvrDtlsAddr: "8층 사방넷연동개발팀",
    rcvrMphnNo: "010-1234-4312",
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    ordNo: 202407040004,
    ordPrdNo: 5,
    prdNm: "로지나잇 리페어 앰플 트리트먼트",
    rcvrNm: "Jim Red",
    optVal: "옵션1",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제1공학관 305호",
    rcvrMphnNo: "010-1234-4893",
    ordDttm: "2024/07/04 11:57:40",
  },
  {
    ordNo: 202407040013,
    ordPrdNo: 1,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040013,
    ordPrdNo: 2,
    prdNm: "다크비어 폼 트리트먼트",
    optVal: "옵션1",
    rcvrNm: "Jim Green",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제4공학관 1층 Smashroom",
    rcvrMphnNo: "010-3333-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040013,
    ordPrdNo: 3,
    prdNm: "뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g",
    optVal: "옵션2",
    rcvrNm: "Joe Black",
    rcvrBaseAddr: "경기 성남시 수정구 금토로 69",
    rcvrDtlsAddr: "8층 사방넷연동개발팀",
    rcvrMphnNo: "010-1234-4312",
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    ordNo: 202407040013,
    ordPrdNo: 4,
    prdNm: "로지나잇 리페어 앰플 트리트먼트",
    rcvrNm: "Jim Red",
    optVal: "옵션1",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제1공학관 305호",
    rcvrMphnNo: "010-1234-4893",
    ordDttm: "2024/07/04 11:57:40",
  },
  {
    ordNo: 202407040016,
    ordPrdNo: 1,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040018,
    ordPrdNo: 1,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040018,
    ordPrdNo: 2,
    prdNm: "다크비어 폼 트리트먼트",
    optVal: "옵션1",
    rcvrNm: "Jim Green",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제4공학관 1층 Smashroom",
    rcvrMphnNo: "010-3333-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
  {
    ordNo: 202407040018,
    ordPrdNo: 3,
    prdNm: "뉴트리플랜 고양이캔 흰살참치와 닭가슴살 160g",
    optVal: "옵션2",
    rcvrNm: "Joe Black",
    rcvrBaseAddr: "경기 성남시 수정구 금토로 69",
    rcvrDtlsAddr: "8층 사방넷연동개발팀",
    rcvrMphnNo: "010-1234-4312",
    ordDttm: "2024/07/04 10:54:22",
  },
  {
    ordNo: 202407040018,
    ordPrdNo: 4,
    prdNm: "로지나잇 리페어 앰플 트리트먼트",
    rcvrNm: "Jim Red",
    optVal: "옵션1",
    rcvrBaseAddr: "경기 안산시 상록구 한양대학로 55",
    rcvrDtlsAddr: "제1공학관 305호",
    rcvrMphnNo: "010-1234-4893",
    ordDttm: "2024/07/04 11:57:40",
  },
  {
    ordNo: 202407040018,
    ordPrdNo: 5,
    prdNm: "센시안 힐링테라피 쿨링패치",
    optVal: "옵션2",
    rcvrNm: "John Brown",
    rcvrBaseAddr: "서울 금천구 가산디지털2로 108 (뉴티캐슬)",
    rcvrDtlsAddr: "405호",
    rcvrMphnNo: "010-1234-5678",
    ordDttm: "2024/07/04 09:24:20",
  },
];

const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const handleSearch = (dataIndex) => {
  state.searchedColumn = dataIndex;
};

const data = rawData.map((item) => ({
  ...item,
  address: `${item.rcvrBaseAddr} ${item.rcvrDtlsAddr}`,
}));

const indexData = data.map((item, index) => ({
  key: index + 1,
  ...item
}));

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
</script>
