<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>{{ customer.name }} 고객님의 주문 분석 ({{ customer.customerSegments }})</h2>
      <section>
        <h3>이전 구매목록</h3>
        <ul class="item-list">
          <li v-for="(order, index) in frequentOrders" :key="index">
            {{ order }}
          </li>
        </ul>
      </section>
      <section>
        <h3>추천 상품</h3>
        <ul class="item-list">
          <li v-for="(recommendation, index) in personalizedRecommendations" :key="index">
            {{ recommendation }}
          </li>
        </ul>
        <p class="reason">{{ personalizedRecommendationsReason }}</p>
      </section>
      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toRefs } from 'vue';

const props = defineProps({
  customer: Object,
});

const emit = defineEmits(['close']);

const { customer } = toRefs(props);

const frequentOrders = ref([]);
const personalizedRecommendations = ref([]);
const personalizedRecommendationsReason = ref('');

onMounted(() => {
  const data = {
    name: "강지훈",
    frequentOrders: [
      "바닐라라떼 4회 (바닐라 시럽 추가 1회, 휘핑크림 추가 1회, 저지방 우유 1회, 얼음 추가 1회)"
    ],
    personalizedRecommendations: [
      "카라멜 마끼아또 저지방 우유",
      "헤이즐넛 라떼 얼음 추가",
      "초콜릿 모카 휘핑크림 추가"
    ],
    personalizedRecommendationsReason: "~~~ 고객님은 바닐라라떼를 다양한 옵션과 함께 선호하십니다. 비슷한 맛과 다양한 옵션을 즐기실 수 있는 카라멜 마끼아또 저지방 우유, 헤이즐넛 라떼 얼음 추가, 초콜릿 모카 휘핑크림 추가를 추천드립니다.",
    customerSegments: "식품 중시형",
    analyzedTime: "2024-08-01T13:43:32.6889131"
  };

  frequentOrders.value = data.frequentOrders;
  personalizedRecommendations.value = data.personalizedRecommendations;
  personalizedRecommendationsReason.value = data.personalizedRecommendationsReason;
});

const closeModal = () => {
  emit('close');
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
  border-radius: 18px;
  width: 90%; 
  max-width: 700px;
  height: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 1.5em;
  text-align: center;
}

.modal section {
  margin-bottom: 20px;
}

.modal ul.item-list {
  list-style: none;
  margin-bottom: 20px;
}

.modal ul.item-list li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 0.9em; 
}

.modal ul.item-list li:last-child {
  border-bottom: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: absolute;
  bottom: 30px; 
  right: 20px; 
}

.modal p.reason {
  
  font-size: 0.9em;
}

.cancel-button {
  display: inline-block;
  background-color: #6091e0;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button:hover {
  background-color: #155ab6;
}

.cancel-button:active {
  background-color: #0e3d91;
}

.cancel-button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed; /*닫기 버튼 외에는 모달을 닫을 수 없도록 */
}
</style>
