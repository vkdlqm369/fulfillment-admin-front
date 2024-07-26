import { createRouter, createWebHistory } from 'vue-router';
import OrderCollect from '../components/OrderCollect.vue';
import AiCustomerAnalytics from '../components/AiCustomerAnalytics.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
