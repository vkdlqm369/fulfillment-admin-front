<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <button class="close-button" @click="closeModal">X</button>
      <h2>{{ customer.name }}'s Purchase Details</h2>
      <section>
        <h3>Purchased Products</h3>
        <ul>
          <li v-for="(product, index) in purchaseDetails" :key="index">
            {{ product.name }} - {{ product.date }} - {{ product.amount | currency }}
          </li>
        </ul>
      </section>
      <section>
        <h3>Purchase Frequency</h3>
        <p>{{ purchaseFrequency }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'CustomerDetail',
  props: {
    customer: Object,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const purchaseDetails = computed(() => {
      // 더미 데이터
      return [
        { name: 'Product A', date: '2024-06-01', amount: 30000 },
        { name: 'Product B', date: '2024-06-15', amount: 45000 },
        { name: 'Product C', date: '2024-07-01', amount: 60000 },
      ];
    });

    const purchaseFrequency = computed(() => {
      // 더미 데이터
      return 'Monthly';
    });

    const closeModal = () => {
      emit('close');
    };

    return {
      purchaseDetails,
      purchaseFrequency,
      closeModal,
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.modal h2 {
  margin-bottom: 20px;
}

.modal section {
  margin-bottom: 20px;
}

.modal ul {
  list-style: none;
  padding: 0;
}

.modal li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.modal li:last-child {
  border-bottom: none;
}
</style>
