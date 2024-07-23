import { createRouter, createWebHistory } from 'vue-router';
import OrderCollectPopup from '../components/OrderCollectPopup.vue';

const routes = [
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
