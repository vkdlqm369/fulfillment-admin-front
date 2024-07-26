import { createRouter, createWebHistory } from 'vue-router';
import OrderCollect from '../components/OrderCollect.vue';
import AiCustomerAnalytics from '../components/AiCustomerAnalytics.vue';
import OrderCollectPopup from '../components/OrderCollectPopup.vue';

const routes = [
  {
    path: '/',
    name: 'OrderCollect',
    component: OrderCollect
  },
  {
    path: '/ai-customer-analytics',
    name: 'AiCustomerAnalytics',
    component: AiCustomerAnalytics
  },
  {
    path: '/order-collect-popup',
    name: 'OrderCollectPopup',
    component: OrderCollectPopup
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
