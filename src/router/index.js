import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../components/LogIn.vue';
import NavigationBar from '../components/NavigationBar.vue';
import OrderCollectPopup from '../components/OrderCollectPopup.vue';

const routes = [
  /*
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  */
  {
    path: '/order-collect-popup',
    name: 'OrderCollectPopup',
    component: () => import('../components/OrderCollectPopup.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
