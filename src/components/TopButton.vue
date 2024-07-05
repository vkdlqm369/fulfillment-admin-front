<template>
  <div>
    <div class="header">
      <h4 class="header-text">타다닥 주문수집</h4>
    </div>
    <div class="filters">
      <div class="date-picker">
        <label for="startDate">수집기간</label>
        <div class="date-inputs">
          <flat-pickr 
            v-model="startDate"
            :config="startConfig"
            class="datepicker-input"
            @input="updateStartDate"
          />
          <span>~</span>
          <flat-pickr 
            v-model="endDate"
            :config="endConfig"
            class="datepicker-input"
            @input="updateEndDate"
          />
        </div>
      </div>
      <div class="buttons">
        <button @click="collectOrders">주문수집</button>
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
      this.endConfig.minDate = newDate;
    }
  },
  methods: {
    collectOrders() {
      if (this.startDate && this.endDate) {
        alert(`${this.formatDate(this.startDate)} ~ ${this.formatDate(this.endDate)}의 데이터를 조회하겠습니다.`);
      } else {
        alert('날짜를 선택해 주세요.');
      }
    },
    refreshPage() {
      window.location.reload();
    },
    updateStartDate() {
      this.saveDate('startDate', this.startDate);
      this.endDate = null; // 시작일을 변경할 때 종료일 초기화
    },
    updateEndDate() {
      this.saveDate('endDate', this.endDate);
    },
    saveDate(key, date) {
      sessionStorage.setItem(key, date);
    },
    getSavedDate(key) {
      return sessionStorage.getItem(key);
    },
    formatDate(date) {
      if (!date) return '';
      const [year, month, day] = date.split('-');
      return `${year}-${month}-${day}`;
    }
  },
};
</script>

<style scoped>
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

.filters {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  gap: 20px;
  border: 2px solid #000;
}

.date-picker {
  display: flex;
  align-items: center;
}

.date-picker label {
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

.datepicker-input {
  padding: 5px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: white;
  color: black;
  width: 150px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.datepicker-input::placeholder {
  color: black !important;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.buttons button:last-child {
  background-color: #6c757d;
}
</style>
