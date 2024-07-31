<template>
  <div>
    <header>
      <h1>Customer Analysis Dashboard</h1>
    </header>
    <div class="table-container">
      <template v-if="filteredCustomers.length === 0">
        <p class="no-data-message">No customers found.</p>
      </template>
      <template v-else>
        <table class="modern-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Purchase Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in filteredCustomers" :key="customer.id" @click="selectCustomer(customer)">
              <td>{{ index + 1 }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.totalPurchase | currency }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <CustomerDetail v-if="showModal" :customer="selectedCustomer" @close="showModal = false" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import CustomerDetail from './AiCustomerDetail.vue';

export default {
  name: 'App',
  components: {
    CustomerDetail,
  },
  setup() {
    const customers = ref([
      { id: 1, name: '정다은', email: 'daneun@example.com', totalPurchase: 120000 },
      { id: 2, name: '윤도윤', email: 'doyoon@example.com', totalPurchase: 90000 },
      { id: 3, name: '김민준', email: 'minjun@example.com', totalPurchase: 150000 },
      { id: 4, name: '강하늘', email: 'haneul@example.com', totalPurchase: 50000 },
      { id: 5, name: '이서윤', email: 'seoyun@example.com', totalPurchase: 75000 },
      // 더 많은 고객 데이터 추가
    ]);

    const searchQuery = ref('');
    const selectedCustomer = ref(null);
    const showModal = ref(false);

    const filteredCustomers = computed(() => {
      return customers.value.filter(customer => customer.name.includes(searchQuery.value));
    });

    const selectCustomer = (customer) => {
      selectedCustomer.value = customer;
      showModal.value = true;
    };

    return {
      searchQuery,
      filteredCustomers,
      selectedCustomer,
      showModal,
      selectCustomer,
    };
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pretendard.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header, footer {
  background-color: #333;
  color: white;
  padding: 10px;
}

.search-container {
  margin: 20px;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: 'Pretendard-Regular', sans-serif;
}

.modern-table th,
.modern-table td {
  padding: 16px;
  white-space: nowrap;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.modern-table thead {
  background-color: #2484C6;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Pretendard-Semibold', sans-serif;
}

.modern-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.modern-table tbody tr:last-child {
  border-bottom: none;
}

.modern-table td {
  background-color: #ffffff;
}

.modern-table tr:hover td {
  background-color: #f9f9f9;
  color: #000000;
}

.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #6c757d;
  font-family: 'Pretendard', sans-serif;
}

/* 반응형 디자인 */
@media screen and (max-width: 768px) {
  .modern-table th,
  .modern-table td {
    padding: 12px;
    font-size: 0.9em;
  }
}
</style>
