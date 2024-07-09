//더미데이터 불러오기
import { rawData as getrawData } from "../assets/rawData";
import { ref, reactive, computed, watch } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import filters from '../assets/filters.json';

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
  console.log("Search rowSpanData:", rowSpanData);
};

// 검색 리셋 처리 함수
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true,
  });
  state.searchText = "";
  rowSpanData = calculateRowSpan(filteredData.value);
  console.log("Reset rowSpanData:", rowSpanData);
};

// filters 데이터를 tree 형식으로 변환
const createFilters = (filters) => {
  return Object.entries(filters).map(([text, children]) => ({
    text,
    value: text,
    children: Object.entries(children).map(([childText, childValue]) => ({
      text: childText,
      value: childValue,
    })),
  }));
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
    filters: createFilters(filters),
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
  console.log("Filter/Sort rowSpanData:", rowSpanData);
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
      filteredData.value.slice((page - 1) * pageSize, page * pageSize)
    );
      console.log("Pagination rowSpanData:", rowSpanData); // rowSpanData 로그 출력
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
console.log("Initial rowSpanData:", rowSpanData); // 초기 rowSpanData 로그 출력

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
  console.log("Watched filteredData rowSpanData:", rowSpanData); // rowSpanData 로그 출력
});

export {
  state,
  searchInput,
  handleSearch,
  handleReset,
  columns,
  indexData,
  paginationConfig,
  onChange
};