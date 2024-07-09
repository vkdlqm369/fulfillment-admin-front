//열 속성

import filters from '../assets/filters.json';


export default columns = [
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

