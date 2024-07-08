<template>
  <!-- Antd 테이블 템플릿 사용 명시 -->
  <a-table
    :columns="columns"
    :data-source="indexData"
    :pagination="paginationConfig"
    @change="onChange"
  >
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`${column.title}을 입력하세요`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #bodyCell="{ text, column }">
      <span
        v-if="state.searchText && state.searchedColumn === column.dataIndex"
      >
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(
              new RegExp(
                `(?<=${state.searchText})|(?=${state.searchText})`,
                'i'
              )
            )"
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
    </template>
  </a-table>
</template>

<script setup>
//더미데이터 불러오기
import { rawData as getrawData } from "../assets/rawData";
import { ref, reactive } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

// 상태를 저장할 reactive 객체 정의
const state = reactive({
  searchText: "",
  searchedColumn: "",
});

// 검색 입력 요소에 대한 ref 생성
const searchInput = ref();

// 검색 처리 함수
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
  rowSpanData = calculateRowSpan(filteredData.value);
 
};

// 검색 리셋 처리 함수
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true,
  });
  state.searchText = "";
  rowSpanData = calculateRowSpan(filteredData.value);
};

//열 속성
const columns = [
  {
    // 인덱스
    title: "No.",
    dataIndex: "key",
    align: "center",
    width: "3%",
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
    key: "prdNm",
    width: "23%",
    align: "center",
    filterIcon: (filtered) => h(SearchOutlined),
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.prdNm.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    // 수집옵션명
    title: "수집옵션명",
    dataIndex: "optVal",
    align: "center",
    width: "10%",
  },
  {
    // 수취인명
    title: "수취인명",
    dataIndex: "rcvrNm",
    key: "rcvrNm",
    width: "7%",
    align: "center",
    filterIcon: (filtered) => h(SearchOutlined),
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.rcvrNm.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    //수취인주소
    title: "수취인주소",
    dataIndex: "address",
    filterDropdownOpen: state.filterDropdownVisible,
    filters: [
      {
        text: "서울",
        value: "서울",
        children: [
          {
            text: "강남구",
            value: "강남구",
          },
          {
            text: "강동구",
            value: "강동구",
          },
          {
            text: "강북구",
            value: "강북구",
          },
          {
            text: "강서구",
            value: "강서구",
          },
          {
            text: "관악구",
            value: "관악구",
          },
          {
            text: "광진구",
            value: "광진구",
          },
          {
            text: "구로구",
            value: "구로구",
          },
          {
            text: "금천구",
            value: "금천구",
          },
          {
            text: "노원구",
            value: "노원구",
          },
          {
            text: "도봉구",
            value: "도봉구",
          },
          {
            text: "동대문구",
            value: "동대문구",
          },
          {
            text: "동작구",
            value: "동작구",
          },
          {
            text: "마포구",
            value: "마포구",
          },
          {
            text: "서대문구",
            value: "서대문구",
          },
          {
            text: "서초구",
            value: "서초구",
          },
          {
            text: "성동구",
            value: "성동구",
          },
          {
            text: "성북구",
            value: "성북구",
          },
          {
            text: "송파구",
            value: "송파구",
          },
          {
            text: "양천구",
            value: "양천구",
          },
          {
            text: "영등포구",
            value: "영등포구",
          },
          {
            text: "용산구",
            value: "용산구",
          },
          {
            text: "은평구",
            value: "은평구",
          },
          {
            text: "종로구",
            value: "종로구",
          },
          {
            text: "중구",
            value: "서울 중구",
          },
          {
            text: "중랑구",
            value: "중랑구",
          },
        ],
      },
      {
        text: "인천",
        value: "인천",
        children: [
          {
            text: "중구",
            value: "인천 중구",
          },
          {
            text: "동구",
            value: "동구",
          },
          {
            text: "미추홀구",
            value: "미추홀구",
          },
          {
            text: "연수구",
            value: "연수구",
          },
          {
            text: "남동구",
            value: "남동구",
          },
          {
            text: "부평구",
            value: "부평구",
          },
          {
            text: "계양구",
            value: "계양구",
          },
          {
            text: "서구",
            value: "서구",
          },
          {
            text: "강화군",
            value: "강화군",
          },
          {
            text: "옹진군",
            value: "옹진군",
          },
        ],
      },
      {
        text: "경기",
        value: "경기",
        children: [
          {
            text: "고양시",
            value: "고양시",
          },
          {
            text: "과천시",
            value: "과천시",
          },
          {
            text: "광명시",
            value: "광명시",
          },
          {
            text: "광주시",
            value: "광주시",
          },
          {
            text: "구리시",
            value: "구리시",
          },
          {
            text: "군포시",
            value: "군포시",
          },
          {
            text: "김포시",
            value: "김포시",
          },
          {
            text: "남양주시",
            value: "남양주시",
          },
          {
            text: "동두천시",
            value: "동두천시",
          },
          {
            text: "부천시",
            value: "부천시",
          },
          {
            text: "성남시",
            value: "성남시",
          },
          {
            text: "수원시",
            value: "수원시",
          },
          {
            text: "시흥시",
            value: "시흥시",
          },
          {
            text: "안산시",
            value: "안산시",
          },
          {
            text: "안성시",
            value: "안성시",
          },
          {
            text: "안양시",
            value: "안양시",
          },
          {
            text: "양주시",
            value: "양주시",
          },
          {
            text: "여주시",
            value: "여주시",
          },
          {
            text: "오산시",
            value: "오산시",
          },
          {
            text: "용인시",
            value: "용인시",
          },
          {
            text: "의왕시",
            value: "의왕시",
          },
          {
            text: "의정부시",
            value: "의정부시",
          },
          {
            text: "이천시",
            value: "이천시",
          },
          {
            text: "파주시",
            value: "파주시",
          },
          {
            text: "평택시",
            value: "평택시",
          },
          {
            text: "포천시",
            value: "포천시",
          },
          {
            text: "하남시",
            value: "하남시",
          },
          {
            text: "화성시",
            value: "화성시",
          },
          {
            text: "가평군",
            value: "가평군",
          },
          {
            text: "연천군",
            value: "연천군",
          },
          {
            text: "양평군",
            value: "양평군",
          },
        ],
      },
    ],
    filterMode: "tree",
    onFilter: (value, record) => record.address.includes(value),
    width: "25%",
    align: "center",
  },
  {
    //수취인연락처
    title: "수취인연락처",
    dataIndex: "rcvrMphnNo",
    align: "center",
    width: "8%",
  },
  {
    //수집일시
    title: "수집일시",
    dataIndex: "ordDttm",
    align: "center",
    width: "9%",
  },
];

// 더미데이터 불러오기
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
  rowSpanData = calculateRowSpan(extra.currentDataSource);
}

// 페이지네이션 설정
const paginationConfig = {
  position: ["bottomCenter"],
  pageSize: 10,
  showSizeChanger: false,
  // 현재 페이지에 해당하는 데이터 기반 rowSpan 다시 계산
  onChange: (page, pageSize) => {
    console.log("Current Page:", page);
    rowSpanData = calculateRowSpan(
      // 현재 페이지 범위만큼 data배열 잘라내서 새로운 배열 반환

      // (page - 1) * pageSize => 시작 인덱스 (현재 페이지 처음 인덱스)
      // page * pageSize => 종료 인덱스 (현재 페이지 마지막 인덱스)

      // ex) page == 1 => 0~9까지의 10개 항목

      data.slice((page - 1) * pageSize, page * pageSize)
    );
  },
};

const calculateRowSpan = (data) => {
  const rowSpanData = data.map((item, index) => {
    //rowSpanData라는 배열 생성
    let rowSpan = 1; // 기본값 1 지정 (1칸)

    // 첫 번째 항목이거나, 현재 항목의 주문번호가 이전 항목의 주문번호와 다르면
    if (index === 0 || data[index].ordNo !== data[index - 1].ordNo) {
      // 다음 항목들을 순회하여 동일한 주문번호를 가진 항목의 개수 세기
      for (let i = index + 1; i < data.length; i++) {
        // 현재 항목과 주문번호가 같은 항목이 있는 동안 rowSpan 값을 증가
        if (data[index].ordNo === data[i].ordNo) {
          rowSpan++;
        } else {
          break; // 주문번호가 다른 항목을 만나면 반복 종료
        }
      }
    } else {
      rowSpan = 0; // 현재 항목의 주문번호가 이전 항목과 같다면 rowSpan을 0으로 설정 (병합될 row임을 명시)
    }
    // rowSpan 값을 현재 항목에 추가한 새로운 객체 반환
    return { ...item, rowSpan };
  });
  // rowSpan 속성이 추가된 새로운 배열을 반환
  return rowSpanData;
};

// 초기 데이터로 rowSpanData 계산
let rowSpanData = calculateRowSpan(indexData);

// columns 배열에 계산된 customCell 추가
columns.forEach((column) => {
  if (column.dataIndex === "ordNo") {
    column.customCell = (_, index) => {
      return { rowSpan: rowSpanData[index].rowSpan };
    };
  }
});

// 필터링된 데이터로 rowSpanData 계산
// 'computed'는 종속된 데이터에 따라 값을 자동으로 다시 계산
const filteredData = computed(() => {
  if (!state.searchText) {
    return indexData;
  }
  // 검색 텍스트와 특정 컬럼에 따라 데이터를 필터링하여 반환
  return indexData.filter((item) => {
    // 검색할 컬럼이 지정되어 있으면 해당 컬럼의 데이터가 검색 텍스트를 포함하는지 확인
    if (state.searchedColumn) {
      return item[state.searchedColumn]
        .toString()
        .toLowerCase()
        .includes(state.searchText.toLowerCase());
    }
    return true;
  });
});

// 'watch'는 특정 데이터가 변경될 때마다 지정된 함수를 실행
watch(filteredData, (newData) => {
  // 'filteredData'가 변경될 때마다 'calculateRowSpan' 함수를 호출하여 'rowSpanData'를 다시 계산
  rowSpanData = calculateRowSpan(newData);
});
</script>
