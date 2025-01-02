import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailModal from '@/components/DetailModal.vue';
import { groupRoutes } from './groups.js'; // 引入 groups.js

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
    },
    {
      path: '/planner',
      name: 'planner',
      component: () => import('../views/PlannerView.vue'),
      children: [
        { path: 'detail', component: DetailModal },
      ],
    },
    {
      path: "/SearchArea",
      name: "SearchArea",
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: "/category/:category?",
      name: "CategoryView",
      component: () => import('../views/CategoryView.vue'),
    },
    groupRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 返回上次的位置
    } else {
      return { top: 0 }; // 默認滾動到頂部
    }},
})

export default router
