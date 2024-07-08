<template>
  <div>

    <div class="header"> <!--상단 헤드 영역-->
      <h4 class="header-text">타다닥 주문수집</h4>
    </div>

    <div class="filters">

      <div class="date-picker">

        <label for="startDate">수집기간</label>

        <div class="date-inputs"> 
          <!--첫 번째 datepicker-->
          <flat-pickr 
            v-model="startDate"  
            :config="startConfig" 
            class="datepicker-input"
            @input="updateStartDate" 
          /> 
            <!-- @input : 날짜가 선택될 때, updateStartDate method 호출 -->
          <span>~</span>
          <!--두 번째 datepicker-->
          <flat-pickr 
            v-model="endDate"
            :config="endConfig"
            class="datepicker-input"
            @input="updateEndDate"
          />
            <!-- @input : 날짜가 선택될 때, updateEndDate method 호출 -->
        </div>
      </div>

      <div class="buttons">
        <!-- @click : 클릭 시. collectOrders method 호출 -->
        <button @click="collectOrders">주문수집</button>
        <!-- @click : 클릭 시. refreshPage method 호출 -->
        <button @click="refreshPage">새로고침</button>
      </div>

    </div>
  </div>
</template>


<script> 
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'TopButton',
  components: {
    flatPickr,
  },

  data() {
    return {
      startDate: this.getSavedDate('startDate'),
      endDate: this.getSavedDate('endDate'),
      startConfig: {
        dateFormat: 'Y-m-d',
        allowInput: true,
        onClose: this.updateStartDate
      },
      endConfig: {
        dateFormat: 'Y-m-d',
        allowInput: true,
        minDate: this.startDate,
        onClose: this.updateEndDate
      }
    };
  },

  watch: {
    startDate(newDate) {
      this.endConfig.minDate = newDate; // 두 번째 날짜 >= 첫 번째 날짜 
    }
  },

  methods: {

    collectOrders() {
      if (this.startDate && this.endDate) {
        alert(`${this.formatDate(this.startDate)} ~ ${this.formatDate(this.endDate)}의 데이터를 조회하겠습니다.`); // 시작일&종료일 선택 O
      } 
      else {
        alert('날짜를 선택해 주세요.'); // 시작일 or 종료일 선택 X
      }
    },

    refreshPage() {
      window.location.reload(); // 새로고침
    },

    updateStartDate() {
      this.saveDate('startDate', this.startDate); // 시작일 변경 -> startDate를 저장
      this.endDate = null; // endDate 초기화
    },

    updateEndDate() {
      this.saveDate('endDate', this.endDate); // 종료일이 선택될 때 호출 endDate 저장
    },

    saveDate(key, date) {
      sessionStorage.setItem(key, date); // sessionStorage에 날짜를 저장
    },

    getSavedDate(key) {
      return sessionStorage.getItem(key); // sessionStorage에서 날짜를 가져옴
    },

    formatDate(date) {
      if (!date) return '';
      const [year, month, day] = date.split('-'); // xxxx-xx-xx format
      return `${year}-${month}-${day}`;
    }
  },
};
</script>


<style scoped>
/* header 영역(타다닥 주문 수집)의 스타일 정의 */
.header {
  padding: 10px 20px;
  background-color: #2c3e50; 
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid #000;
}

.header-text {
  color: white;
  margin: 0;
  text-align: left;
}

.filters { /* 수집기간 박스 */
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  gap: 20px;
  border: 2px solid #000;
}

.date-picker { /* datepicker 스타일 */
  display: flex;
  align-items: center;
}

.date-picker label { /* datepicker 라벨 스타일 */
  margin-right: 10px;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
}

.date-inputs { 
  display: flex;
  align-items: center;
}

.date-picker span {
  margin: 0 10px;
  color: black;
}

.datepicker-input { /* datepicker 입력 필드 스타일 */
  padding: 5px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: white;
  color: black;
  width: 150px;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.datepicker-input::placeholder {
  color: black !important;
}

.buttons { /* button 영역의 스타일 */
  display: flex;
  align-items: center;
  gap: 10px;
}

.buttons button { /* 주문수집 button */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.buttons button:last-child { /* 새로고침 버튼 */
  background-color: #6c757d;
}
</style>
